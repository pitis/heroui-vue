<script setup lang="ts">
import type { ScrollShadowVariants } from '@heroui/styles'
import { scrollShadowVariants } from '@heroui/styles'
import { computed, shallowRef, useTemplateRef, watch, watchEffect } from 'vue'

type Visibility = 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'both' | 'none'

const props = withDefaults(defineProps<{
  orientation?: 'vertical' | 'horizontal'
  variant?: ScrollShadowVariants['variant']
  hideScrollBar?: boolean
  /** Shadow size in px. */
  size?: number
  /** Scroll distance in px before a shadow appears. */
  offset?: number
  /** 'auto' follows the scroll position; anything else forces those shadows. */
  visibility?: Visibility
  isEnabled?: boolean
}>(), { orientation: 'vertical', variant: 'fade', size: 40, offset: 0, visibility: 'auto', isEnabled: true })

const emit = defineEmits<{ visibilityChange: [visibility: Exclude<Visibility, 'auto'>] }>()

const el = useTemplateRef<HTMLElement>('el')
const overflow = shallowRef({ before: false, after: false })
const isAuto = computed(() => props.isEnabled && props.visibility === 'auto')

function check() {
  const node = el.value
  if (!node)
    return
  const vertical = props.orientation === 'vertical'
  const start = vertical ? node.scrollTop : Math.abs(node.scrollLeft)
  const scrollSize = vertical ? node.scrollHeight : node.scrollWidth
  const clientSize = vertical ? node.clientHeight : node.clientWidth
  const before = start > props.offset
  const after = start + clientSize + props.offset < scrollSize - 1
  if (before !== overflow.value.before || after !== overflow.value.after)
    overflow.value = { before, after }
}

watchEffect((onCleanup) => {
  const node = el.value
  if (!node || !isAuto.value)
    return
  check()
  node.addEventListener('scroll', check, { passive: true })
  // content or size changes can create or remove overflow without a scroll event
  const resize = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(check)
  resize?.observe(node)
  const mutation = typeof MutationObserver === 'undefined' ? undefined : new MutationObserver(check)
  mutation?.observe(node, { attributes: true, attributeFilter: ['class', 'style'], characterData: true, childList: true, subtree: true })
  onCleanup(() => {
    node.removeEventListener('scroll', check)
    resize?.disconnect()
    mutation?.disconnect()
  })
})

const ends = computed(() => (props.orientation === 'vertical' ? ['top', 'bottom'] as const : ['left', 'right'] as const))

const detected = computed(() => {
  const { before, after } = overflow.value
  return before && after ? 'both' : before ? ends.value[0] : after ? ends.value[1] : 'none'
})
watch(detected, value => isAuto.value && emit('visibilityChange', value))

const shadowAttrs = computed<Record<string, string>>(() => {
  const [start, end] = ends.value
  if (isAuto.value) {
    const { before, after } = overflow.value
    return before && after
      ? { [`data-${start}-${end}-scroll`]: 'true' }
      : { [`data-${start}-scroll`]: String(before), [`data-${end}-scroll`]: String(after) }
  }
  const forced = props.visibility === 'auto' ? 'none' : props.visibility
  return forced === 'none' ? {} : forced === 'both' ? { [`data-${start}-${end}-scroll`]: 'true' } : { [`data-${forced}-scroll`]: 'true' }
})
</script>

<template>
  <div
    ref="el"
    data-slot="scroll-shadow"
    :class="scrollShadowVariants({ hideScrollBar, orientation, variant }).base()"
    :data-orientation="orientation"
    :data-scroll-shadow-mode="isAuto ? 'auto' : 'manual'"
    :data-scroll-shadow-size="size"
    :style="{ '--scroll-shadow-size': `${size}px`, '--scroll-shadow-offset': `${offset}px` }"
    v-bind="shadowAttrs"
  >
    <slot />
  </div>
</template>
