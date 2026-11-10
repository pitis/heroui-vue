<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { CalendarContext } from './context'
import { calendarVariants } from '@heroui/styles'
import { CalendarRoot } from 'reka-ui'
import { computed, inject } from 'vue'
import { datePickerKey } from '../date-picker/context'
import CalendarScope from './CalendarScope'
import { useCalendarRoot, WEEK_START } from './useCalendarRoot'

// shortcut: month view only (no visibleDuration week/day views)
const props = defineProps<{
  minValue?: DateValue
  maxValue?: DateValue
  firstDayOfWeek?: keyof typeof WEEK_START
  isDateUnavailable?: (date: DateValue) => boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  locale?: string
}>()

const own = defineModel<DateValue>()
// inside a DatePicker's popover, the picker owns the value (and closes on pick)
const picker = inject(datePickerKey, undefined)
const model = picker?.kind === 'single' ? computed({ get: () => picker.get() as DateValue | undefined, set: picker.set }) : own
const { ctx, placeholder } = useCalendarRoot('calendar', calendarVariants() as unknown as CalendarContext['slots'], props, model.value)
</script>

<template>
  <!-- not as-child: Reka renders a hidden label before the slot -->
  <CalendarRoot
    v-slot="{ grid, weekDays, locale: resolvedLocale }"
    v-model="model"
    v-model:placeholder="placeholder"
    data-slot="calendar"
    :class="calendarVariants().base()"
    :min-value="ctx.minValue"
    :max-value="ctx.maxValue"
    :week-starts-on="firstDayOfWeek ? WEEK_START[firstDayOfWeek] : undefined"
    :is-date-unavailable="isDateUnavailable"
    :disabled="isDisabled"
    :readonly="isReadOnly"
    :locale="locale"
    fixed-weeks
    :initial-focus="!!picker"
  >
    <CalendarScope :grid="grid" :week-days="weekDays" :locale="resolvedLocale">
      <slot :is-year-picker-open="ctx.isYearPickerOpen" />
    </CalendarScope>
  </CalendarRoot>
</template>
