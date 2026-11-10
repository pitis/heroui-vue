<script setup lang="ts">
import { sliderVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { sliderKey } from './context'

const slider = inject(sliderKey)!
const text = computed(() => slider.values.value.map(slider.format.value).join(' – '))
</script>

<template>
  <output data-slot="slider-output" :class="sliderVariants().output()" aria-live="off">
    <slot :values="slider.values.value" :text="text">
      {{ text }}
    </slot>
  </output>
</template>
