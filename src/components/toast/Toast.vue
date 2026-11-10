<script setup lang="ts">
import type { ToastContentValue, QueuedToast } from './queue'
import { toastVariants } from '@heroui/styles'
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, shallowRef, useTemplateRef, watch } from 'vue'
import { toastItemKey, toastRegionKey } from './context'

// One toast in a Toast.Provider; computes its place in the stack as the CSS variables @heroui/styles animates.
const props = defineProps<{
  toast: QueuedToast
  variant?: ToastContentValue['variant']
}>()

const region = inject(toastRegionKey)!
const el = useTemplateRef<HTMLElement>('el')
const entering = shallowRef(true)
const slots = computed(() => toastVariants({ placement: region.placement, variant: props.variant ?? props.toast.content.variant }))
provide(toastItemKey, { get toast() { return props.toast }, get slots() { return slots.value } })

const all = computed(() => region.queue.toasts.value)
const live = computed(() => all.value.filter(toast => !toast.isExiting))
// exiting toasts keep their slot in the full list; the others stack among the live ones
const index = computed(() => (props.toast.isExiting ? all.value : live.value).findIndex(toast => toast.key === props.toast.key))
const isFrontmost = computed(() => index.value === 0)
const isHidden = computed(() => index.value >= region.queue.maxVisibleToasts)
const isExpanded = computed(() => region.isExpanded && !isHidden.value)

const style = computed(() => {
  const layout = live.value
  const frontHeight = region.heights[layout[0]?.key ?? ''] ?? region.heights[props.toast.key] ?? 0
  let before = 0
  for (let i = 0; i < index.value; i++)
    before += region.heights[layout[i]?.key ?? ''] ?? frontHeight
  const height = region.heights[props.toast.key]
  return {
    '--offset-collapsed': `${index.value * region.gap}px`,
    '--offset-expanded': `${before + index.value * region.gap}px`,
    '--scale-collapsed': `${1 - index.value * region.scaleFactor}`,
    '--front-height': `${frontHeight}px`,
    ...(height ? { '--toast-height': `${height}px` } : {}),
    'zIndex': props.toast.isExiting ? 0 : all.value.length - index.value,
  }
})

// natural height (scrollHeight: collapsed toasts are clipped to the front one's height)
let observer: ResizeObserver | undefined
function measure() {
  if (el.value)
    region.heights[props.toast.key] = el.value.scrollHeight
}
onMounted(() => {
  measure()
  observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(measure)
  observer?.observe(el.value!.firstElementChild ?? el.value!)
  // one frame with data-entering (offset -100%), then transition into place
  requestAnimationFrame(() => requestAnimationFrame(() => (entering.value = false)))
})
onBeforeUnmount(() => {
  observer?.disconnect()
  delete region.heights[props.toast.key]
})

// focus must not stay on a toast that disappears
const focusable = computed(() => !props.toast.isExiting && !isHidden.value && (isFrontmost.value || isExpanded.value))
watch(focusable, async (canFocus) => {
  await nextTick()
  if (!canFocus && el.value?.contains(document.activeElement))
    (el.value.closest('[data-slot="toast-region"]') as HTMLElement | null)?.focus()
})
</script>

<template>
  <div
    ref="el"
    role="status"
    aria-atomic="true"
    data-slot="toast"
    :class="slots.toast()"
    :tabindex="focusable ? 0 : -1"
    :aria-hidden="!focusable || undefined"
    :inert="isHidden || undefined"
    :data-entering="entering || undefined"
    :data-exiting="toast.isExiting || undefined"
    :data-expanded="isExpanded || undefined"
    :data-frontmost="isFrontmost || undefined"
    :data-hidden="isHidden || undefined"
    :data-index="index"
    :data-placement="region.placement"
    :style="style"
  >
    <slot />
  </div>
</template>
