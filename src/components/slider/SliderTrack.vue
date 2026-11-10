<script setup lang="ts">
import { sliderVariants } from '@heroui/styles'
import { SliderTrack } from 'reka-ui'
import { computed, inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { fillRange, sliderKey } from './context'

const slider = inject(sliderKey)!
// the track's end borders double as the fill's rounded caps when the fill reaches an edge
const fillEdges = computed(() => {
  const [start, end] = fillRange(slider)
  return slider.values.value.length > 1
    ? { 'data-fill-start': start === 0 || undefined, 'data-fill-end': end === 100 || undefined }
    : { 'data-fill-start': end > 0 || undefined, 'data-fill-end': end === 100 || undefined }
})
</script>

<template>
  <SliderTrack as-child>
    <Bridge data-slot="slider-track" :class="sliderVariants().track()" :data-disabled="slider.isDisabled.value || undefined" v-bind="fillEdges">
      <slot />
    </Bridge>
  </SliderTrack>
</template>
