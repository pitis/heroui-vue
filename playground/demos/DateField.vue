<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { TimeValue } from 'reka-ui'
import { CalendarDate, Time } from '@internationalized/date'
import { DateField, Description, FieldError, Label, TimeField } from 'heroui-vue'
import { shallowRef } from 'vue'

const birthday = shallowRef<DateValue>(new CalendarDate(1990, 5, 17))
const meeting = shallowRef<DateValue>()
const alarm = shallowRef<TimeValue>(new Time(7, 30))
</script>

<template>
  <div class="flex max-w-sm flex-col gap-5">
    <DateField v-model="birthday">
      <Label>Birthday</Label>
      <DateField.Group>
        <DateField.Input />
      </DateField.Group>
      <Description>Value: {{ birthday?.toString() ?? 'none' }}</Description>
    </DateField>
    <DateField v-model="meeting" granularity="minute" is-required :is-invalid="!meeting">
      <Label is-required>
        Meeting
      </Label>
      <DateField.Group>
        <DateField.Input v-slot="{ segment }">
          <DateField.Segment :segment="segment" />
        </DateField.Input>
      </DateField.Group>
      <FieldError>Pick a date and time.</FieldError>
    </DateField>
    <TimeField v-model="alarm">
      <Label>Alarm</Label>
      <TimeField.Group variant="secondary">
        <TimeField.Input />
      </TimeField.Group>
    </TimeField>
  </div>
</template>
