<script setup lang="ts">
import type { SortDescriptor } from './context'
import { tableVariants } from '@heroui/styles'
import { provide } from 'vue'
import { tableSortKey } from './context'

// shortcut: a plain semantic <table>; React Aria's grid keyboard navigation, row selection, column resizing,
// drag and drop and virtualization are not ported — add them here if a table needs them
/** Column sorted and its direction; sortable Columns update it. */
const sortDescriptor = defineModel<SortDescriptor>('sortDescriptor')
provide(tableSortKey, sortDescriptor)
</script>

<template>
  <table data-slot="table-content" :class="tableVariants().content()">
    <slot />
  </table>
</template>
