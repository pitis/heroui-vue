<script setup lang="ts">
import type { VNode } from 'vue'
import { tabsVariants } from '@heroui/styles'
import { inject } from 'vue'
import { tabKey, tabsKey } from './context'

// Lives inside every Tab but only renders in the selected one; on selection change the new
// indicator animates from where the previous one was (what React Aria's SelectionIndicator does).
const tabs = inject(tabsKey)!
const isSelected = inject(tabKey)!

function remember({ el }: VNode) {
  tabs.indicatorRect = (el as HTMLElement).getBoundingClientRect()
}

function slideIn({ el }: VNode) {
  const indicator = el as HTMLElement
  const from = tabs.indicatorRect
  if (!from || !indicator.animate)
    return
  const to = indicator.getBoundingClientRect()
  // duration and easing come from @heroui/styles (0s under prefers-reduced-motion)
  const { transitionDuration, transitionTimingFunction } = getComputedStyle(indicator)
  indicator.animate(
    [{ translate: `${from.left - to.left}px ${from.top - to.top}px`, width: `${from.width}px`, height: `${from.height}px` }, {}],
    { duration: Number.parseFloat(transitionDuration) * 1000 || 0, easing: transitionTimingFunction || 'ease-out' },
  )
}
</script>

<template>
  <span
    v-if="isSelected"
    data-slot="tabs-indicator"
    data-animation-ready="true"
    :class="tabsVariants().tabIndicator()"
    @vue:mounted="slideIn"
    @vue:before-unmount="remember"
  />
</template>
