<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarCell, CalendarCellTrigger, injectRangeCalendarRootContext, RangeCalendarCell, RangeCalendarCellTrigger } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { calendarKey, calendarMonthKey } from './context'

defineProps<{ date: DateValue }>()

const ctx = inject(calendarKey)!
const month = inject(calendarMonthKey)!
const range = injectRangeCalendarRootContext(null)
// Reka always renders aria-disabled ("false" too); the range track CSS rounds next to any [aria-disabled], so set it only when true, like React Aria
const ariaDisabled = (date: DateValue) => (range && (range.isDateDisabled(date) || range.isDateUnavailable?.(date))) || undefined
</script>

<template>
  <!-- a day: Reka's cell (td) and cell trigger (the focusable day), styled as React Aria's CalendarCell -->
  <CalendarCell v-if="ctx.kind === 'calendar'" :date="date">
    <CalendarCellTrigger v-slot="{ dayValue }" as-child :day="date" :month="month()!">
      <Bridge interactive :highlight="false" data-slot="calendar-cell" :class="ctx.slots.cell()">
        <slot :date="date">
          {{ dayValue }}
        </slot>
      </Bridge>
    </CalendarCellTrigger>
  </CalendarCell>
  <RangeCalendarCell v-else :date="date" :aria-disabled="ariaDisabled(date)">
    <!-- Reka's preview range while picking (highlighted*) shows like React Aria's selection -->
    <RangeCalendarCellTrigger
      v-slot="{ dayValue, selected, highlighted, selectionStart, selectionEnd, highlightedStart, highlightedEnd, disabled }"
      as-child
      :day="date"
      :month="month()!"
    >
      <Bridge
        interactive
        :highlight="false"
        data-slot="range-calendar-cell"
        :class="ctx.slots.cell()"
        :data-selected="selected || highlighted || undefined"
        :data-selection-start="selectionStart || highlightedStart || undefined"
        :data-selection-end="selectionEnd || highlightedEnd || undefined"
      >
        <span
          data-slot="range-calendar-cell-button"
          class="range-calendar__cell-button"
          :data-selected="selectionStart || selectionEnd || highlightedStart || highlightedEnd || undefined"
          :data-disabled="disabled || undefined"
        >
          <slot :date="date">{{ dayValue }}</slot>
        </span>
      </Bridge>
    </RangeCalendarCellTrigger>
  </RangeCalendarCell>
</template>
