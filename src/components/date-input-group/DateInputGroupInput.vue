<script setup lang="ts">
import { dateInputGroupVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { dateFieldKey } from './context'
import DateInputGroupSegment from './DateInputGroupSegment.vue'

// The segments; slot props `{ segment }` customize each (default: DateInputGroup.Segment).
const props = defineProps<{
  /** In a DateRangePicker: which end of the range this input edits. */
  slot?: 'start' | 'end'
}>()

const field = inject(dateFieldKey)!
const segments = computed(() => (Array.isArray(field.segments) ? field.segments : field.segments?.[props.slot ?? 'start'] ?? []))
</script>

<template>
  <div data-slot="date-input-group-input" :class="dateInputGroupVariants().input()" :slot="slot">
    <template v-for="(segment, i) in segments" :key="`${segment.part}-${i}`">
      <slot :segment="segment">
        <DateInputGroupSegment :segment="segment" :range-type="slot" />
      </slot>
    </template>
  </div>
</template>
