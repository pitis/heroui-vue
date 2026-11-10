<script setup lang="ts">
import { emptyStateVariants } from '@heroui/styles'
</script>

<template>
  <div data-slot="empty-state" :class="emptyStateVariants()">
    <slot>No results found</slot>
  </div>
</template>
