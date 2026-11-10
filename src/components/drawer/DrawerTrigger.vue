<script setup lang="ts">
import { drawerVariants } from '@heroui/styles'
import { DialogTrigger } from 'reka-ui'

defineProps<{
  /** Make the single child the trigger (e.g. a Button) instead of rendering HeroUI's trigger button. */
  asChild?: boolean
}>()
</script>

<template>
  <DialogTrigger :as-child="asChild" data-slot="drawer-trigger" :class="asChild ? undefined : drawerVariants().trigger()">
    <slot />
  </DialogTrigger>
</template>
