<script setup lang="ts">
import { getLocalTimeZone } from '@internationalized/date'
import { calendarYearPickerVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { calendarKey } from '../calendar/context'

const ctx = inject(calendarKey)!
const text = computed(() => new Intl.DateTimeFormat(ctx.locale, { month: 'long', year: 'numeric' }).format(ctx.placeholder.toDate(getLocalTimeZone())))
</script>

<template>
  <span data-slot="calendar-year-picker-trigger-heading" :class="calendarYearPickerVariants().triggerHeading()">{{ text }}</span>
</template>
