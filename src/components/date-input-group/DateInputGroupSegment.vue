<script setup lang="ts">
import type { DateSegment } from './context'
import { dateInputGroupVariants } from '@heroui/styles'
import { DateFieldInput, DateRangeFieldInput, TimeFieldInput } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { dateFieldKey } from './context'

const props = defineProps<{
  segment: DateSegment
  /** Set by the Input part in a DateRangePicker. */
  rangeType?: 'start' | 'end'
}>()

const field = inject(dateFieldKey)!
const component = { date: DateFieldInput, time: TimeFieldInput, range: DateRangeFieldInput }[field.kind]
</script>

<template>
  <!-- Reka's segment: a contenteditable spinbutton (or a literal like "/") -->
  <component :is="component" as-child :part="segment.part as never" v-bind="field.kind === 'range' ? { type: props.rangeType ?? 'start' } : {}">
    <Bridge
      as="span"
      :highlight="false"
      data-slot="date-input-group-segment"
      :class="dateInputGroupVariants().segment()"
      :data-type="segment.part"
      :data-placeholder="(field.isEmpty && segment.part !== 'literal') || undefined"
    >
      {{ segment.value }}
    </Bridge>
  </component>
</template>
