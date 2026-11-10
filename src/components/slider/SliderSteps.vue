<script setup lang="ts">
import { sliderVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { fillRange, percentOf, sliderKey } from './context'

const slider = inject(sliderKey)!
const slots = sliderVariants()
const edge = computed(() => (slider.orientation.value === 'vertical' ? 'bottom' : 'left'))

const steps = computed(() => {
  const { min, max, step } = { min: slider.min.value, max: slider.max.value, step: slider.step.value }
  const count = Math.floor((max - min) / step + 1e-9) + 1
  if (!(step > 0) || !Number.isFinite(count) || count > 1000)
    return []
  const [start, end] = fillRange(slider)
  return Array.from({ length: count }, (_, i) => {
    const percent = percentOf(slider, Math.min(max, min + i * step))
    return { percent, filled: percent >= start && percent <= end }
  })
})
</script>

<template>
  <div
    aria-hidden="true"
    data-slot="slider-steps"
    data-direction="ltr"
    :class="slots.steps()"
    :data-orientation="slider.orientation.value"
    :data-disabled="slider.isDisabled.value || undefined"
  >
    <span
      v-for="(stepMark, i) in steps"
      :key="i"
      data-slot="slider-step"
      :class="slots.step()"
      :data-filled="stepMark.filled || undefined"
      :style="{ [edge]: `${stepMark.percent}%` }"
    />
  </div>
</template>
