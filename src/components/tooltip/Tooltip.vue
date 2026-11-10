<script setup lang="ts">
import { TooltipProvider, TooltipRoot } from 'reka-ui'
import { computed } from 'vue'

// renders no element of its own
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  /** Hover delay in ms before opening; defaults to the theme's --tooltip-delay. */
  delay?: number
  isDisabled?: boolean
}>()

const open = defineModel<boolean>('open', { default: false })

function themeDelay() {
  if (typeof window === 'undefined')
    return 1500
  const value = getComputedStyle(document.documentElement).getPropertyValue('--tooltip-delay').trim()
  return value ? Number.parseFloat(value) * (value.endsWith('ms') ? 1 : 1000) : 1500
}
const delayDuration = computed(() => props.delay ?? themeDelay())
</script>

<template>
  <!-- shortcut: no close delay (--tooltip-close-delay); Reka closes on leave, keeping the tooltip open while hovered -->
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot v-model:open="open" :disabled="isDisabled">
      <slot :open="open" />
    </TooltipRoot>
  </TooltipProvider>
</template>
