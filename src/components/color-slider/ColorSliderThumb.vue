<script setup lang="ts">
import { colorSliderVariants } from '@heroui/styles'
import { ColorSliderThumb as RekaColorSliderThumb } from 'reka-ui'
import { computed, inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { toCssColor } from '../color-picker/context'
import { colorSliderKey } from './context'

const slider = inject(colorSliderKey)!
// @heroui/styles centers the thumb on the cross axis with top/left 50%, like React Aria's translate(-50%, -50%)
// shortcut: assumes left-to-right; RTL horizontal sliders need translate(50%, -50%)
const style = computed(() => ({
  transform: slider.orientation.value === 'vertical' ? 'translate(-50%, 50%)' : 'translate(-50%, -50%)',
  backgroundColor: slider.isDisabled.value ? undefined : toCssColor(slider.value.value),
}))
</script>

<template>
  <RekaColorSliderThumb as-child>
    <Bridge
      as="span"
      interactive
      data-slot="color-slider-thumb"
      :class="colorSliderVariants().thumb()"
      :style="style"
      :data-dragging="slider.dragging.value || undefined"
      :data-disabled="slider.isDisabled.value || undefined"
    />
  </RekaColorSliderThumb>
</template>
