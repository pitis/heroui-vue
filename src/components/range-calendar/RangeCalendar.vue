<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { DateRange } from 'reka-ui'
import type { CalendarContext } from '../calendar/context'
import { rangeCalendarVariants } from '@heroui/styles'
import { RangeCalendarRoot } from 'reka-ui'
import { computed, inject } from 'vue'
import { datePickerKey } from '../date-picker/context'
import CalendarScope from '../calendar/CalendarScope'
import { useCalendarRoot, WEEK_START } from '../calendar/useCalendarRoot'

const props = defineProps<{
  minValue?: DateValue
  maxValue?: DateValue
  firstDayOfWeek?: keyof typeof WEEK_START
  isDateUnavailable?: (date: DateValue) => boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  locale?: string
}>()

/** `{ start, end }` */
const own = defineModel<DateRange>()
// inside a DateRangePicker's popover, the picker owns the value (and closes once both ends are picked)
const picker = inject(datePickerKey, undefined)
const model = picker?.kind === 'range' ? computed({ get: () => picker.get() as DateRange | undefined, set: picker.set }) : own
const { ctx, placeholder } = useCalendarRoot('range', rangeCalendarVariants() as unknown as CalendarContext['slots'], props, model.value?.start)
</script>

<template>
  <RangeCalendarRoot
    v-slot="{ grid, weekDays, locale: resolvedLocale }"
    v-model="model"
    v-model:placeholder="placeholder"
    data-slot="range-calendar"
    :class="rangeCalendarVariants().base()"
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
  </RangeCalendarRoot>
</template>
