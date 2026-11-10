<script setup lang="ts">
import { calendarYearPickerVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { calendarKey } from '../calendar/context'
import { yearGridKey } from './context'

const props = defineProps<{ year: number }>()

const ctx = inject(calendarKey)!
const grid = inject(yearGridKey)!
const selected = computed(() => props.year === grid.selectedYear)
</script>

<template>
  <!-- roving tabindex: only the active year is tabbable; hidden from the tab order while the grid is closed -->
  <div
    role="option"
    data-slot="calendar-year-picker-year-cell"
    :class="calendarYearPickerVariants().yearCell()"
    :tabindex="ctx.isYearPickerOpen && year === grid.activeYear ? 0 : -1"
    :aria-selected="selected"
    :data-selected="selected || undefined"
    :data-year="year"
    :data-current="year === grid.currentYear || undefined"
    @click="grid.select(year)"
    @keydown.enter.space.prevent="grid.select(year)"
  >
    <slot :year="year" :is-selected="selected">
      {{ year }}
    </slot>
  </div>
</template>
