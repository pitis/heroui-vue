<script setup lang="ts">
import { colorSliderVariants } from '@heroui/styles'
import { getChannelRange, getChannelValue, normalizeColor } from 'reka-ui'
import { computed, inject } from 'vue'
import { colorSliderKey } from './context'

const slider = inject(colorSliderKey)!
// as React Aria labels the value: hue in degrees, 0–1 or 0–100 channels as percentages, RGB as 0–255
const text = computed(() => {
  if (slider.value.value == null)
    return ''
  const channel = slider.channel.value
  const value = getChannelValue(normalizeColor(slider.value.value), channel)
  if (channel === 'hue')
    return `${Math.round(value)}°`
  const { max } = getChannelRange(channel)
  return max === 255 ? String(Math.round(value)) : `${Math.round(max === 1 ? value * 100 : value)}%`
})
</script>

<template>
  <output data-slot="color-slider-output" :class="colorSliderVariants().output()">
    <slot :text="text">{{ text }}</slot>
  </output>
</template>
