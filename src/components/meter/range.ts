import { computed } from 'vue'

export interface RangeProps {
  value?: number
  minValue?: number
  maxValue?: number
  /** Text for aria-valuetext and the Output part; defaults to the percentage. */
  valueLabel?: string
}

/** Shared by Meter, ProgressBar and ProgressCircle: clamped percentage + the text shown for it. */
export function useRange(props: RangeProps) {
  const min = computed(() => props.minValue ?? 0)
  const max = computed(() => props.maxValue ?? 100)
  const clamped = computed(() => Math.min(max.value, Math.max(min.value, props.value ?? 0)))
  const percentage = computed(() => (clamped.value - min.value) / (max.value - min.value) * 100)
  const valueText = computed(() => props.valueLabel ?? new Intl.NumberFormat(undefined, { style: 'percent' }).format(percentage.value / 100))
  return { min, max, clamped, percentage, valueText }
}
