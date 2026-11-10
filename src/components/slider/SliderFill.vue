<script setup lang="ts">
import { sliderVariants } from '@heroui/styles'
import { SliderRange } from 'reka-ui'
import { inject } from 'vue'
import { sliderKey } from './context'

// Reka positions the range (start/end offsets); must sit inside Slider.Track
const slider = inject(sliderKey)!
</script>

<template>
  <SliderRange data-slot="slider-fill" :class="sliderVariants().fill()" :data-disabled="slider.isDisabled.value || undefined" />
</template>
