import { defineComponent, h, mergeProps, onMounted, onUpdated, shallowRef } from 'vue'

type Attrs = Record<string, unknown>

// Reka UI reads these back by exact value (`dataset.disabled !== ""`), so they must stay as Reka wrote them.
const READ_BACK = new Set(['data-disabled', 'data-active', 'data-highlighted', 'data-dismissable-layer'])

// React Aria's rule: no focus ring when the last interaction was a pointer. :focus-visible alone misses
// Reka parts that preventDefault() pointerdown and then call focus() (ColorArea), which Chrome shows as keyboard focus.
let pointerModality = false
if (typeof document !== 'undefined') {
  document.addEventListener('pointerdown', () => (pointerModality = true), true)
  document.addEventListener('keydown', () => (pointerModality = false), true)
}

const isOn = (value: unknown) => value != null && value !== false && value !== 'false'
const isOpenState = (state: unknown) => typeof state === 'string' && (state === 'open' || state.endsWith('-open'))

/**
 * Reka UI describes state as `data-state="checked"`, `data-highlighted=""`, `data-side="top"`.
 * @heroui/styles selects on React Aria's `data-selected="true"`, `data-hovered="true"`, `data-placement="top"`.
 * Returns the React Aria attributes implied by the Reka ones in `attrs`; never overrides one set explicitly.
 */
export function ariaStateAttrs(attrs: Attrs, overlay = false, highlight = true): Attrs {
  const out: Attrs = {}
  for (const key in attrs) {
    const value = attrs[key]
    if ((value === '' || value === true) && key.startsWith('data-') && !key.startsWith('data-reka-') && !READ_BACK.has(key))
      out[key] = 'true'
  }
  const add = (key: string, on: boolean, value: unknown = 'true') => {
    if (on && attrs[key] == null)
      out[key] = value
  }
  const state = attrs['data-state']
  const open = isOpenState(state)
  add('data-selected', state === 'checked' || state === 'active' || state === 'on')
  add('data-indeterminate', state === 'indeterminate')
  add('data-expanded', open)
  add('data-open', open)
  add('data-exiting', overlay && state === 'closed')
  // Reka's keyboard/pointer highlight looks like React Aria's hover (where focus stays elsewhere, e.g. a combobox input)
  add('data-hovered', highlight && isOn(attrs['data-highlighted']))
  add('aria-disabled', isOn(attrs['data-disabled']))
  add('data-placement', attrs['data-side'] != null, attrs['data-side'])
  add('data-outside-month', isOn(attrs['data-outside-view']))
  return out
}

/**
 * The element a Reka UI part renders through (`<RekaPart as-child><Bridge as="button" …>`):
 * it receives Reka's attributes and adds the React Aria ones @heroui/styles needs.
 */
export const Bridge = defineComponent({
  name: 'HeroBridge',
  inheritAttrs: false,
  props: {
    as: { type: String, default: 'div' },
    /**
     * Enter/exit animated element: also emits `data-exiting` while closing, and `data-entering` from opening
     * until its enter animations finish (React Aria's timing: transition-based styles rely on it going away).
     */
    overlay: Boolean,
    /** Also emits `data-hovered` / `data-pressed` / `data-focus-visible`, for styles with no :hover/:active fallback. */
    interactive: Boolean,
    /** Show Reka's `data-highlighted` as `data-hovered`. Off where highlight means real focus or outlives it. */
    highlight: { type: Boolean, default: true },
  },
  setup(props, { attrs, slots }) {
    const hovered = shallowRef(false)
    const pressed = shallowRef(false)
    const focusVisible = shallowRef(false)
    const el = shallowRef<Element>()
    const entering = shallowRef(false)
    let wasOpen = false
    // runs after each render: a closed → open change starts the entering phase
    function trackEntering() {
      const open = props.overlay && isOpenState(attrs['data-state'])
      if (open && !wasOpen) {
        entering.value = true
        requestAnimationFrame(async () => {
          await Promise.allSettled((el.value?.getAnimations?.() ?? []).map(animation => animation.finished))
          entering.value = false
        })
      }
      wasOpen = open
    }
    onMounted(trackEntering)
    onUpdated(trackEntering)

    const listeners = {
      onPointerenter: (event: PointerEvent) => (hovered.value = event.pointerType !== 'touch'),
      onPointerleave: () => (hovered.value = pressed.value = false),
      onPointerdown: () => (pressed.value = true),
      onPointerup: () => (pressed.value = false),
      onFocusin: (event: FocusEvent) => (focusVisible.value = !pointerModality && (event.target as Element).matches(':focus-visible')),
      onFocusout: () => (focusVisible.value = false),
    }
    return () => {
      // render the first open frame as entering already, so transition-based styles start from their hidden state
      const isEntering = entering.value || (props.overlay && isOpenState(attrs['data-state']) && !wasOpen)
      return h(
        props.as,
        mergeProps(attrs, ariaStateAttrs(attrs, props.overlay, props.highlight), props.overlay ? { 'ref': el, 'data-entering': isEntering || undefined } : {}, props.interactive
          ? {
              ...listeners,
              'data-hovered': hovered.value || undefined,
              'data-pressed': pressed.value || undefined,
              'data-focus-visible': focusVisible.value || undefined,
            }
          : {}),
        slots.default?.(),
      )
    }
  },
})
