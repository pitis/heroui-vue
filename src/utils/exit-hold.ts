import type { Ref } from 'vue'
import { nextTick, shallowRef, watch } from 'vue'

/**
 * Keeps an overlay mounted after `open` turns false until every animation and transition inside `el`
 * has finished, as React Aria does. Reka's own presence only waits for CSS animations, not transitions.
 */
export function useExitHold(open: Ref<boolean>, el: () => Element | undefined | null) {
  const present = shallowRef(open.value)
  watch(open, async (isOpen) => {
    if (isOpen) {
      present.value = true
      return
    }
    await nextTick() // let data-exiting reach the DOM so the exit animations/transitions start
    const animations = el()?.getAnimations?.({ subtree: true }) ?? []
    await Promise.allSettled(animations.map(animation => animation.finished))
    if (!open.value)
      present.value = false
  })
  return present
}
