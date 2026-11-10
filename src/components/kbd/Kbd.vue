<script setup lang="ts">
import type { KbdVariants } from '@heroui/styles'
import { kbdVariants } from '@heroui/styles'

defineProps<{ variant?: KbdVariants['variant'] }>()
</script>

<template>
  <kbd data-slot="kbd" :class="kbdVariants({ variant }).base()">
    <slot />
  </kbd>
</template>
