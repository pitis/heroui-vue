import type { InjectionKey } from 'vue'
import { computed, inject, onBeforeUnmount, onMounted, provide, shallowRef } from 'vue'

type Side = 'top' | 'bottom' | 'left' | 'right'

/** React Aria placement, as used throughout the HeroUI docs. */
export type Placement = Side | `${'top' | 'bottom'} ${'left' | 'right' | 'start' | 'end'}` | `${'left' | 'right'} ${'top' | 'bottom'}`

/** React Aria placement ("bottom", "top start", "left bottom"…) → Reka UI `side` / `align`. */
export function sideAlign(placement: Placement = 'bottom') {
  const [side, cross] = placement.split(' ') as [Side, string | undefined]
  const align = !cross ? 'center' : cross === 'end' || cross === 'right' || cross === 'bottom' ? 'end' : 'start'
  return { side, align } as const
}

/**
 * Inline style for a popper-positioned overlay element (popover, tooltip, menu, listbox…).
 * `name` is the Reka family, as in its `--reka-<name>-content-transform-origin` variable.
 * The z-index matches React Aria's; Reka copies it onto its positioning wrapper.
 */
export function overlayStyle(name: string) {
  return { 'zIndex': 100000, '--trigger-anchor-point': `var(--reka-${name}-content-transform-origin)` }
}

const ARROW_SIZE = 12
const arrowKey: InjectionKey<(present: boolean) => void> = Symbol('heroui-overlay-arrow')

/**
 * Reka adds the arrow's height on top of `sideOffset`; React Aria's `offset` (which HeroUI's defaults assume)
 * already includes it. Called by overlay content: returns the sideOffset for Reka, given HeroUI's offset.
 */
export function useArrowOffset(offset: (hasArrow: boolean) => number) {
  const hasArrow = shallowRef(false)
  provide(arrowKey, present => (hasArrow.value = present))
  return computed(() => offset(hasArrow.value) - (hasArrow.value ? ARROW_SIZE : 0))
}

/** Called by an overlay's Arrow part so its content can account for it. */
export function useRegisterArrow() {
  const set = inject(arrowKey, undefined)
  onMounted(() => set?.(true))
  onBeforeUnmount(() => set?.(false))
}
