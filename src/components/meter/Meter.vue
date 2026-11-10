<script setup lang="ts">
import type { MeterVariants } from '@heroui/styles'
import { meterVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { provideField } from '../../utils/field'
import { meterKey } from './context'
import { useRange } from './range'

const props = defineProps<{
  value?: number
  minValue?: number
  maxValue?: number
  valueLabel?: string
  color?: MeterVariants['color']
  size?: MeterVariants['size']
  isDisabled?: boolean
}>()

const slots = computed(() => meterVariants({ color: props.color, size: props.size }))
const { min, max, clamped, percentage, valueText } = useRange(props)
// Label inside renders as a span that names the meter
const field = provideField(props, 'span')

provide(meterKey, computed(() => ({
  slots: slots.value as unknown as Record<string, () => string>,
  percentage: percentage.value,
  valueText: valueText.value,
  isIndeterminate: false,
})))
</script>

<template>
  <div
    role="meter"
    data-slot="meter"
    :class="slots.base()"
    :aria-valuenow="clamped"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuetext="valueText"
    :aria-labelledby="field.labelId"
    :data-disabled="isDisabled || undefined"
  >
    <slot :percentage="percentage" :value-text="valueText" />
  </div>
</template>
