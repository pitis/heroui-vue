<script setup lang="ts">
import type { ProgressBarVariants } from '@heroui/styles'
import { progressBarVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { provideField } from '../../utils/field'
import { progressBarKey } from '../meter/context'
import { useRange } from '../meter/range'

const props = defineProps<{
  value?: number
  minValue?: number
  maxValue?: number
  valueLabel?: string
  color?: ProgressBarVariants['color']
  size?: ProgressBarVariants['size']
  isIndeterminate?: boolean
  isDisabled?: boolean
}>()

const slots = computed(() => progressBarVariants({ color: props.color, size: props.size }))
const { min, max, clamped, percentage, valueText } = useRange(props)
const field = provideField(props, 'span')

provide(progressBarKey, computed(() => ({
  slots: slots.value as unknown as Record<string, () => string>,
  percentage: percentage.value,
  valueText: valueText.value,
  isIndeterminate: !!props.isIndeterminate,
})))
</script>

<template>
  <div
    role="progressbar"
    data-slot="progress-bar"
    :class="slots.base()"
    :aria-valuenow="isIndeterminate ? undefined : clamped"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuetext="isIndeterminate ? undefined : valueText"
    :aria-labelledby="field.labelId"
    :data-indeterminate="isIndeterminate || undefined"
    :data-disabled="isDisabled || undefined"
  >
    <slot :percentage="percentage" :value-text="valueText" :is-indeterminate="isIndeterminate" />
  </div>
</template>
