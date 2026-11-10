<script setup lang="ts">
import type { PaginationVariants } from '@heroui/styles'
import { paginationVariants } from '@heroui/styles'

defineProps<{ size?: PaginationVariants['size'] }>()
</script>

<template>
  <nav aria-label="pagination" data-slot="pagination" :class="paginationVariants({ size }).base()">
    <slot />
  </nav>
</template>
