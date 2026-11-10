<script setup lang="ts">
import { tableVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { tableSortKey } from './context'

const props = defineProps<{
  /** Key reported in the sort descriptor. */
  id?: string
  allowsSorting?: boolean
}>()

const sort = inject(tableSortKey)!
const direction = computed(() => (sort.value?.column === props.id ? sort.value?.direction : undefined))
const ariaSort = computed(() => (props.allowsSorting ? direction.value ?? 'none' : undefined))

function toggle() {
  if (!props.allowsSorting || props.id == null)
    return
  sort.value = { column: props.id, direction: direction.value === 'ascending' ? 'descending' : 'ascending' }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle()
  }
}
</script>

<template>
  <th
    scope="col"
    data-slot="table-column"
    :class="tableVariants().column()"
    :aria-sort="ariaSort"
    :tabindex="allowsSorting ? 0 : undefined"
    :data-allows-sorting="allowsSorting || undefined"
    @click="toggle"
    @keydown="allowsSorting && onKeydown($event)"
  >
    <slot :sort-direction="direction" :allows-sorting="allowsSorting" />
  </th>
</template>
