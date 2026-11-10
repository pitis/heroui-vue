<script setup lang="ts">
import { sliderVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { fillRange, percentOf, sliderKey } from './context'

const props = defineProps<{ value: number }>()

const slider = inject(sliderKey)!
const visible = computed(() => props.value >= slider.min.value && props.value <= slider.max.value)
const percent = computed(() => percentOf(slider, props.value))
const filled = computed(() => {
  const [start, end] = fillRange(slider)
  return percent.value >= start && percent.value <= end
})
</script>

<template>
  <div
    v-if="visible"
    data-slot="slider-mark"
    :class="sliderVariants().mark()"
    :data-value="value"
    :data-filled="filled || undefined"
    :data-disabled="slider.isDisabled.value || undefined"
    :style="{ [slider.orientation.value === 'vertical' ? 'bottom' : 'left']: `${percent}%` }"
  >
    <slot>{{ slider.format.value(value) }}</slot>
  </div>
</template>
