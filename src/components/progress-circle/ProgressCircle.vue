<script setup lang="ts">
import type { ProgressCircleVariants } from '@heroui/styles'
import { progressCircleVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { provideField } from '../../utils/field'
import { progressCircleKey } from '../meter/context'
import { useRange } from '../meter/range'

const props = defineProps<{
  value?: number
  minValue?: number
  maxValue?: number
  valueLabel?: string
  color?: ProgressCircleVariants['color']
  size?: ProgressCircleVariants['size']
  isIndeterminate?: boolean
  isDisabled?: boolean
}>()

const slots = computed(() => progressCircleVariants({ color: props.color, size: props.size }))
const { min, max, clamped, percentage, valueText } = useRange(props)
const field = provideField(props, 'span')

provide(progressCircleKey, computed(() => ({
  slots: slots.value as unknown as Record<string, () => string>,
  percentage: percentage.value,
  valueText: valueText.value,
  isIndeterminate: !!props.isIndeterminate,
})))
</script>

<template>
  <div
    role="progressbar"
    data-slot="progress-circle"
    :class="slots.base()"
    :aria-valuenow="isIndeterminate ? undefined : clamped"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuetext="isIndeterminate ? undefined : valueText"
    :aria-labelledby="$slots.default ? field.labelId : undefined"
    :data-disabled="isDisabled || undefined"
  >
    <slot :percentage="percentage" :value-text="valueText" :is-indeterminate="isIndeterminate" />
  </div>
</template>
