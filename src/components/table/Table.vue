<script setup lang="ts">
import type { TableVariants } from '@heroui/styles'
import { tableVariants } from '@heroui/styles'

defineProps<{ variant?: TableVariants['variant'] }>()
</script>

<template>
  <div data-slot="table" :class="tableVariants({ variant }).base()">
    <slot />
  </div>
</template>
