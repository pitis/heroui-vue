<script setup lang="ts">
import { tableVariants } from '@heroui/styles'
import { IconChevronUp } from '../icons'

// Column label + direction arrow; pass the Column's `sort-direction` slot prop.
withDefaults(defineProps<{
  sortDirection?: 'ascending' | 'descending'
  showIndicator?: boolean
}>(), { showIndicator: true })

const slots = tableVariants()
</script>

<template>
  <span data-slot="table-sortable-column-header" :class="slots.sortableColumnHeader()" :data-direction="sortDirection">
    <slot />
    <slot v-if="showIndicator && sortDirection" name="indicator">
      <IconChevronUp data-slot="table-sortable-column-indicator" :class="slots.sortableColumnIndicator()" :data-direction="sortDirection" />
    </slot>
  </span>
</template>
