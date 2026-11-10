<script setup lang="ts">
import { sliderVariants } from '@heroui/styles'
import { inject } from 'vue'
import { sliderKey } from './context'

const slider = inject(sliderKey)!
</script>

<template>
  <div
    data-slot="slider-marks"
    data-direction="ltr"
    :class="sliderVariants().marks()"
    :data-orientation="slider.orientation.value"
    :data-disabled="slider.isDisabled.value || undefined"
  >
    <slot />
  </div>
</template>
