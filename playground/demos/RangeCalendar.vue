<script setup lang="ts">
import type { DateRange } from 'reka-ui'
import { CalendarDate } from '@internationalized/date'
import { RangeCalendar } from 'heroui-vue'
import { shallowRef } from 'vue'

const range = shallowRef<DateRange>({ start: new CalendarDate(2026, 11, 9), end: new CalendarDate(2026, 11, 13) })
</script>

<template>
  <div class="flex flex-col gap-2">
    <RangeCalendar v-model="range" aria-label="Trip dates">
      <RangeCalendar.Header>
        <RangeCalendar.YearPickerTrigger>
          <RangeCalendar.YearPickerTriggerHeading />
          <RangeCalendar.YearPickerTriggerIndicator />
        </RangeCalendar.YearPickerTrigger>
        <RangeCalendar.NavButton slot="previous" />
        <RangeCalendar.NavButton slot="next" />
      </RangeCalendar.Header>
      <RangeCalendar.Grid>
        <RangeCalendar.GridHeader />
        <RangeCalendar.GridBody />
      </RangeCalendar.Grid>
      <RangeCalendar.YearPickerGrid>
        <RangeCalendar.YearPickerGridBody />
      </RangeCalendar.YearPickerGrid>
    </RangeCalendar>
    <span class="text-sm text-muted">{{ range?.start?.toString() }} → {{ range?.end?.toString() }}</span>
  </div>
</template>
