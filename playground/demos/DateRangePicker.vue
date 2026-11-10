<script setup lang="ts">
import type { DateRange } from 'reka-ui'
import { CalendarDate } from '@internationalized/date'
import { DateField, DateRangePicker, Label, RangeCalendar } from 'heroui-vue'
import { shallowRef } from 'vue'

const stay = shallowRef<DateRange>({ start: new CalendarDate(2026, 12, 20), end: new CalendarDate(2026, 12, 27) })
</script>

<template>
  <DateRangePicker v-model="stay" class="w-96">
    <Label>Stay</Label>
    <DateField.Group>
      <DateField.Input slot="start" />
      <DateRangePicker.RangeSeparator />
      <DateField.Input slot="end" />
      <DateField.Suffix>
        <DateRangePicker.Trigger>
          <DateRangePicker.TriggerIndicator />
        </DateRangePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <DateRangePicker.Popover>
      <RangeCalendar aria-label="Stay dates">
        <RangeCalendar.Header>
          <RangeCalendar.Heading />
          <RangeCalendar.NavButton slot="previous" />
          <RangeCalendar.NavButton slot="next" />
        </RangeCalendar.Header>
        <RangeCalendar.Grid>
          <RangeCalendar.GridHeader />
          <RangeCalendar.GridBody />
        </RangeCalendar.Grid>
      </RangeCalendar>
    </DateRangePicker.Popover>
  </DateRangePicker>
  <p class="text-sm text-muted">
    {{ stay?.start?.toString() }} → {{ stay?.end?.toString() }}
  </p>
</template>
