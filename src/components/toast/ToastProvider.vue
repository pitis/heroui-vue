<script setup lang="ts">
import type { ToastPlacement } from './context'
import type { QueuedToast, ToastQueue } from './queue'
import { toastVariants } from '@heroui/styles'
import { computed, onBeforeUnmount, provide, reactive, shallowRef, toRef, useTemplateRef } from 'vue'
import { toastRegionKey } from './context'
import { DEFAULT_GAP, toastQueue } from './queue'
import ToastDefault from './ToastDefault.vue'

const props = withDefaults(defineProps<{
  placement?: ToastPlacement
  /** Queue to show; defaults to the one `toast()` uses. */
  queue?: ToastQueue
  gap?: number
  scaleFactor?: number
  width?: number | string
  /** Keep the stack fanned out instead of only on hover/focus. */
  isExpanded?: boolean
}>(), { placement: 'bottom', gap: DEFAULT_GAP, scaleFactor: 0.05, width: 460 })

defineSlots<{
  /** Custom rendering of each toast; default: indicator, title, description, action, close button. */
  default?: (props: { toast: QueuedToast }) => unknown
}>()

const queue = computed(() => props.queue ?? toastQueue)
const toasts = computed(() => queue.value.toasts.value)
const heights = reactive<Record<string, number>>({})
const hoveredOrFocused = shallowRef(false)
const active = computed(() => toasts.value.filter(toast => !toast.isExiting).length)
const isExpanded = computed(() => (props.isExpanded || hoveredOrFocused.value) && active.value > 1)

provide(toastRegionKey, reactive({
  queue,
  placement: toRef(props, 'placement'),
  gap: toRef(props, 'gap'),
  scaleFactor: toRef(props, 'scaleFactor'),
  isExpanded,
  heights,
}))

// timers pause while the user reads (hover/focus) or the tab is hidden
function setEngaged(engaged: boolean) {
  hoveredOrFocused.value = engaged
  if (engaged)
    queue.value.pauseAll()
  else
    queue.value.resumeAll()
}
function onFocusout(event: FocusEvent) {
  if (!(event.currentTarget as Element).contains(event.relatedTarget as Node))
    setEngaged(false)
}
const onVisibility = () => (document.hidden ? queue.value.pauseAll() : !hoveredOrFocused.value && queue.value.resumeAll())

// Alt+T jumps to the newest notification
const region = useTemplateRef<HTMLElement>('region')
function onHotkey(event: KeyboardEvent) {
  if (event.altKey && event.code === 'KeyT')
    region.value?.querySelector<HTMLElement>('[data-slot="toast"][data-frontmost="true"]')?.focus()
}
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', onVisibility)
  document.addEventListener('keydown', onHotkey)
}
onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', onVisibility)
  document.removeEventListener('keydown', onHotkey)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="toasts.length"
      ref="region"
      role="region"
      aria-label="Notifications (Alt+T)"
      tabindex="-1"
      data-slot="toast-region"
      :class="toastVariants({ placement }).region()"
      :data-expanded="isExpanded || undefined"
      :style="{ '--gap': `${gap}px`, '--placement': placement, '--scale-factor': scaleFactor, '--toast-width': typeof width === 'number' ? `${width}px` : width }"
      @pointerenter="setEngaged(true)"
      @pointerleave="setEngaged(false)"
      @focusin="setEngaged(true)"
      @focusout="onFocusout"
    >
      <template v-for="item in toasts" :key="item.key">
        <slot :toast="item">
          <ToastDefault :toast="item" />
        </slot>
      </template>
    </div>
  </Teleport>
</template>
