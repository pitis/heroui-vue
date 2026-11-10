<script setup lang="ts">
import type { ColorSwatchVariants } from '@heroui/styles'
import type { Color } from 'reka-ui'
import { colorSwatchVariants } from '@heroui/styles'
import { ColorSwatch as RekaColorSwatch } from 'reka-ui'
import { inject } from 'vue'
import { colorPickerKey } from '../color-picker/context'

defineProps<{
  /** CSS color string (hex, rgb(), hsl()) or a Reka color object. */
  color?: string | Color
  /** Accessible name; derived from the color when omitted. */
  label?: string
  shape?: ColorSwatchVariants['shape']
  size?: ColorSwatchVariants['size']
}>()

// inside a ColorPicker, a swatch without `color` shows the picker's color
const picker = inject(colorPickerKey, undefined)
</script>

<template>
  <!-- Reka sets --reka-color-swatch-color (alpha-aware hex); @heroui/styles reads --color-swatch-current -->
  <RekaColorSwatch
    :color="color ?? picker"
    :label="label"
    data-slot="color-swatch"
    :class="colorSwatchVariants({ shape, size })"
    style="--color-swatch-current: var(--reka-color-swatch-color)"
  >
    <slot />
  </RekaColorSwatch>
</template>
