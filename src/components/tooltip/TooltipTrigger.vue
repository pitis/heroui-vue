<script setup lang="ts">
import { tooltipVariants } from '@heroui/styles'
import { TooltipTrigger as RekaTooltipTrigger } from 'reka-ui'

defineProps<{
  /** Make the single child the trigger (e.g. a Button) instead of rendering a focusable wrapper. */
  asChild?: boolean
}>()
</script>

<template>
  <RekaTooltipTrigger v-if="asChild" as-child>
    <slot />
  </RekaTooltipTrigger>
  <RekaTooltipTrigger v-else as="div" role="button" tabindex="0" data-slot="tooltip-trigger" :class="tooltipVariants().trigger()">
    <slot />
  </RekaTooltipTrigger>
</template>
