<script setup lang="ts">
import { dropdownVariants } from '@heroui/styles'
import { DropdownMenuTrigger } from 'reka-ui'

defineProps<{
  /** Make the single child the trigger (e.g. a Button) instead of rendering HeroUI's trigger button. */
  asChild?: boolean
}>()
</script>

<template>
  <DropdownMenuTrigger :as-child="asChild" data-slot="dropdown-trigger" :class="asChild ? undefined : dropdownVariants().trigger()">
    <slot />
  </DropdownMenuTrigger>
</template>
