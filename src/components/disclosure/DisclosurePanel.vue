<script setup lang="ts">
import { inject, nextTick, shallowRef, useTemplateRef, watch } from 'vue'
import { disclosureKey } from './context'

// Animates height through --disclosure-panel-height (0px ↔ measured px), the variable @heroui/styles transitions;
// 'auto' once open so the content can grow, and `hidden` once closed so it leaves the tab order.
const disclosure = inject(disclosureKey)!
const el = useTemplateRef<HTMLElement>('el')
const open = disclosure.isExpanded
const height = shallowRef(open.value ? 'auto' : '0px')
const hidden = shallowRef(!open.value)

function settle() {
  if (open.value)
    height.value = 'auto'
  else
    hidden.value = true
}

watch(open, async (isOpen) => {
  hidden.value = false
  await nextTick()
  const node = el.value
  if (!node)
    return
  if (isOpen) {
    height.value = `${node.scrollHeight}px`
  }
  else {
    // from 'auto' the browser can't transition: pin the current height first, then go to 0 next frame
    height.value = `${node.scrollHeight}px`
    await nextTick()
    void node.offsetHeight
    height.value = '0px'
  }
  // no transition (reduced motion, or none defined): settle now, as transitionend will never fire
  if (Number.parseFloat(getComputedStyle(node).transitionDuration) === 0)
    settle()
})

function onTransitionEnd(event: TransitionEvent) {
  if (event.target === el.value && event.propertyName === 'height')
    settle()
}
</script>

<template>
  <div
    :id="disclosure.panelId"
    ref="el"
    role="region"
    :aria-labelledby="disclosure.triggerId"
    :data-slot="disclosure.look.prefix === 'accordion' ? 'accordion-panel' : 'disclosure-content'"
    :class="disclosure.look.classes.panel"
    :data-expanded="open || undefined"
    :hidden="hidden"
    :style="{ '--disclosure-panel-height': height }"
    @transitionend="onTransitionEnd"
  >
    <slot />
  </div>
</template>
