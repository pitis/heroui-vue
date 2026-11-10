<script setup lang="ts">
import { sliderVariants } from '@heroui/styles'
import { SliderThumb as RekaSliderThumb } from 'reka-ui'
import { computed, inject, shallowRef } from 'vue'
import { Bridge } from '../../utils/bridge'
import { useField } from '../../utils/field'
import { sliderKey } from './context'

const slider = inject(sliderKey)!
const field = useField()
const focused = shallowRef(false)
// Reka focuses the thumb it moves, so the focused thumb is the dragged one
const dragging = computed(() => slider.isDragging.value && focused.value)
// @heroui/styles centers the thumb on the cross axis with top/left 50%, as React Aria's translate(-50%, -50%) expects
// shortcut: assumes left-to-right; RTL horizontal sliders need translate(50%, -50%)
const transform = computed(() => (slider.orientation.value === 'vertical' ? 'translate(-50%, 50%)' : 'translate(-50%, -50%)'))
</script>

<template>
  <RekaSliderThumb as-child>
    <Bridge
      as="span"
      interactive
      data-slot="slider-thumb"
      :class="sliderVariants().thumb()"
      :style="{ transform }"
      :aria-labelledby="field?.labelId"
      :data-dragging="dragging || undefined"
      @focus="focused = true"
      @blur="focused = false"
    >
      <slot />
    </Bridge>
  </RekaSliderThumb>
</template>
