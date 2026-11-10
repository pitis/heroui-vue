<script setup lang="ts">
import { calendarYearPickerVariants } from '@heroui/styles'
import { IconChevronDown } from '../icons'
</script>

<template>
  <span aria-hidden="true" data-slot="calendar-year-picker-trigger-indicator" :class="calendarYearPickerVariants().triggerIndicator()">
    <slot>
      <IconChevronDown />
    </slot>
  </span>
</template>
