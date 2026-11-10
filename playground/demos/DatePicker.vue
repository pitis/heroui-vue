<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { CalendarDate } from '@internationalized/date'
import { Calendar, DateField, DatePicker, Label } from 'heroui-vue'
import { shallowRef } from 'vue'

const date = shallowRef<DateValue>(new CalendarDate(2026, 11, 20))
</script>

<template>
  <DatePicker v-model="date" class="w-72">
    <Label>Appointment</Label>
    <DateField.Group>
      <DateField.Input />
      <DateField.Suffix>
        <DatePicker.Trigger>
          <DatePicker.TriggerIndicator />
        </DatePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <DatePicker.Popover>
      <Calendar aria-label="Appointment date">
        <Calendar.Header>
          <Calendar.YearPickerTrigger>
            <Calendar.YearPickerTriggerHeading />
            <Calendar.YearPickerTriggerIndicator />
          </Calendar.YearPickerTrigger>
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader />
          <Calendar.GridBody />
        </Calendar.Grid>
        <Calendar.YearPickerGrid>
          <Calendar.YearPickerGridBody />
        </Calendar.YearPickerGrid>
      </Calendar>
    </DatePicker.Popover>
  </DatePicker>
  <p class="text-sm text-muted">
    Value: {{ date?.toString() ?? 'none' }}
  </p>
</template>
