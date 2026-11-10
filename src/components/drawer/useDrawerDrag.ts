import type { Ref } from 'vue'
import type { DrawerPlacement } from './context'

const DRAG_THRESHOLD = 8 // px before a drag starts
const DISMISS_FRACTION = 0.3 // dismiss when dragged past 30% of the drawer
const VELOCITY_THRESHOLD = 0.5 // px/ms: or on a fast flick

/**
 * Drag the drawer toward its edge to dismiss it (ported from HeroUI's React drawer).
 * `fromHandle`: the listeners sit on a handle (Sheet.Handle) that drags `el`, so any press on it starts a drag.
 */
export function useDrawerDrag(placement: () => DrawerPlacement | undefined, enabled: () => boolean, close: () => void, el: Ref<HTMLElement | undefined | null>, fromHandle = false) {
  let dragging = false
  let active = false
  let start = 0
  let offset = 0
  let velocity = 0
  let lastTime = 0
  let lastPos = 0
  const vertical = () => placement() === 'top' || placement() === 'bottom'
  const pos = (event: PointerEvent) => (vertical() ? event.clientY : event.clientX)
  // only toward the drawer's own edge
  const clamp = (delta: number) => (placement() === 'top' || placement() === 'left' ? Math.min(0, delta) : Math.max(0, delta))

  // throws if the pointer is already gone (e.g. released outside the window); losing capture is harmless then
  function capture(node: HTMLElement, pointerId: number, on: boolean) {
    try {
      if (on)
        node.setPointerCapture(pointerId)
      else
        node.releasePointerCapture(pointerId)
    }
    catch {}
  }

  function snapBack(node: HTMLElement) {
    node.style.transition = 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1)'
    node.style.transform = ''
    node.addEventListener('transitionend', () => (node.style.transition = ''), { once: true })
  }

  function onPointerdown(event: PointerEvent) {
    const target = event.target as Element
    if (!enabled() || event.button !== 0)
      return
    if (!fromHandle && (target.closest('[data-slot="drawer-dialog"]') !== event.currentTarget || target.closest('input, textarea, button, [role="button"], select, a, [data-slot="drawer-body"]')))
      return
    dragging = true
    active = false
    start = lastPos = pos(event)
    lastTime = Date.now()
    offset = velocity = 0
  }

  function onPointermove(event: PointerEvent) {
    const node = el.value
    if (!dragging || !node)
      return
    const raw = pos(event) - start
    if (!active) {
      if (Math.abs(raw) < DRAG_THRESHOLD)
        return
      active = true
      node.style.transition = 'none'
      capture(node, event.pointerId, true)
    }
    offset = clamp(raw)
    const now = Date.now()
    if (now > lastTime) {
      velocity = (pos(event) - lastPos) / (now - lastTime)
      lastTime = now
      lastPos = pos(event)
    }
    node.style.transform = `translate${vertical() ? 'Y' : 'X'}(${offset}px)`
  }

  function onPointerup(event: PointerEvent) {
    const node = el.value
    if (!dragging)
      return
    dragging = false
    if (!node || !active)
      return
    active = false
    capture(node, event.pointerId, false)
    const size = vertical() ? node.offsetHeight : node.offsetWidth
    if (Math.abs(offset) > size * DISMISS_FRACTION || Math.abs(velocity) > VELOCITY_THRESHOLD) {
      node.style.transition = ''
      close()
    }
    else {
      snapBack(node)
    }
  }

  function onPointercancel() {
    const wasActive = active
    dragging = active = false
    if (wasActive && el.value)
      snapBack(el.value)
  }

  return { onPointerdown, onPointermove, onPointerup, onPointercancel }
}
