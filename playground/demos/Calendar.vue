<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import { Calendar } from 'heroui-vue'
import { shallowRef } from 'vue'

const date = shallowRef(new CalendarDate(2026, 11, 10))
const isWeekend = (d: { toDate: (tz: string) => Date }) => [0, 6].includes(d.toDate('UTC').getDay())
</script>

<template>
  <div class="flex flex-wrap gap-8">
    <div class="flex flex-col gap-2">
      <Calendar v-model="date" aria-label="Event date">
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
      <span class="text-sm text-muted">Selected: {{ date?.toString() }}</span>
    </div>
    <Calendar :is-date-unavailable="isWeekend" :min-value="new CalendarDate(2026, 11, 3)" aria-label="Weekdays only">
      <Calendar.Header>
        <Calendar.Heading />
        <Calendar.NavButton slot="previous" />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader v-slot="{ day }">
          <Calendar.HeaderCell>{{ day }}</Calendar.HeaderCell>
        </Calendar.GridHeader>
        <Calendar.GridBody v-slot="{ date: day }">
          <Calendar.Cell :date="day">
            {{ day.day }}
            <Calendar.CellIndicator v-if="day.day % 7 === 0" />
          </Calendar.Cell>
        </Calendar.GridBody>
      </Calendar.Grid>
    </Calendar>
  </div>
</template>
