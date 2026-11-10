<script setup lang="ts">
import { DialogTrigger } from 'reka-ui'
import { inject } from 'vue'
import { modalKey } from './context'

defineProps<{
  /** Make the single child the trigger (e.g. a Button) instead of rendering a wrapper button. */
  asChild?: boolean
}>()

const { look } = inject(modalKey)!
</script>

<template>
  <DialogTrigger :as-child="asChild" :data-slot="`${look.prefix}-trigger`" :class="asChild ? undefined : look.variants().trigger()">
    <slot />
  </DialogTrigger>
</template>
