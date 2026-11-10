import { onBeforeUnmount, shallowRef } from 'vue'

/** True from a pointerdown until the pointer is released anywhere (React Aria's data-dragging). */
export function useDragging() {
  const dragging = shallowRef(false)
  const stop = () => (dragging.value = false)
  onBeforeUnmount(() => window.removeEventListener('pointerup', stop))
  return {
    dragging,
    start() {
      dragging.value = true
      window.addEventListener('pointerup', stop, { once: true })
    },
  }
}
