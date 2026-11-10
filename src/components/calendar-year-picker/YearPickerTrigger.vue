<script setup lang="ts">
import { calendarYearPickerVariants } from '@heroui/styles'
import { inject } from 'vue'
import { calendarKey } from '../calendar/context'

// Replaces Calendar.Heading: shows the month and year, and opens the year grid.
const ctx = inject(calendarKey)!
</script>

<template>
  <button
    type="button"
    data-slot="calendar-year-picker-trigger"
    :class="calendarYearPickerVariants().trigger()"
    :aria-expanded="ctx.isYearPickerOpen"
    :data-open="ctx.isYearPickerOpen || undefined"
    @click="ctx.isYearPickerOpen = !ctx.isYearPickerOpen"
  >
    <slot />
  </button>
</template>
