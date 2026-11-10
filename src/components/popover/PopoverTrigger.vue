<script setup lang="ts">
import { popoverVariants } from '@heroui/styles'
import { PopoverTrigger as RekaPopoverTrigger } from 'reka-ui'

defineProps<{
  /** Make the single child the trigger (e.g. a Button) instead of rendering a wrapper button. */
  asChild?: boolean
}>()
</script>

<template>
  <RekaPopoverTrigger :as-child="asChild" data-slot="popover-trigger" :class="asChild ? undefined : popoverVariants().trigger()">
    <slot />
  </RekaPopoverTrigger>
</template>
