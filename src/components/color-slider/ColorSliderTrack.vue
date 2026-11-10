<script setup lang="ts">
import { colorSliderVariants } from '@heroui/styles'
import { colorToString, ColorSliderTrack as RekaColorSliderTrack, getChannelRange, normalizeColor, setChannelValue } from 'reka-ui'
import { computed, inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { colorSliderKey } from './context'

const slider = inject(colorSliderKey)!
// the CSS draws rounded end caps past the track in the channel's first and last colors
const edges = computed(() => {
  if (slider.value.value == null)
    return {}
  const color = normalizeColor(slider.value.value)
  const { min, max } = getChannelRange(slider.channel.value)
  return {
    '--track-start-color': colorToString(setChannelValue(color, slider.channel.value, min), 'hex'),
    '--track-end-color': colorToString(setChannelValue(color, slider.channel.value, max), 'hex'),
  }
})
</script>

<template>
  <!-- Reka sets the channel gradient as the background -->
  <RekaColorSliderTrack as-child>
    <Bridge data-slot="color-slider-track" :class="colorSliderVariants().track()" :style="edges">
      <slot />
    </Bridge>
  </RekaColorSliderTrack>
</template>
