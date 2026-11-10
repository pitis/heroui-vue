<script setup lang="ts">
import { paginationVariants } from '@heroui/styles'

defineProps<{
  /** The current page. */
  isActive?: boolean
  isDisabled?: boolean
}>()
</script>

<template>
  <button
    type="button"
    data-slot="pagination-link"
    :class="paginationVariants().link()"
    :aria-current="isActive ? 'page' : undefined"
    :data-active="isActive || undefined"
    :disabled="isDisabled"
  >
    <slot />
  </button>
</template>
