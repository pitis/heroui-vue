<script setup lang="ts">
import { getChannelValue, normalizeColor, parseColor } from 'reka-ui'
import { computed, inject } from 'vue'
import { colorSwatchPickerItemKey, colorSwatchPickerKey } from './context'

const picker = inject(colorSwatchPickerKey)!
const item = inject(colorSwatchPickerItemKey)!
// a dark checkmark on light swatches
const isLight = computed(() => {
  try {
    const rgb = normalizeColor(parseColor(item.color))
    const [r, g, b] = (['red', 'green', 'blue'] as const).map(channel => getChannelValue(rgb, channel))
    return (0.2126 * r! + 0.7152 * g! + 0.0722 * b!) / 255 > 0.5
  }
  catch {
    return false
  }
})
</script>

<template>
  <span aria-hidden="true" data-slot="color-swatch-picker-indicator" :class="picker.slots.indicator()" :data-light-color="isLight || undefined">
    <slot>
      <svg aria-hidden="true" data-slot="color-swatch-picker-checkmark" fill="none" role="presentation" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 12 12">
        <polyline points="2.5 6 5 8.5 9.5 3" />
      </svg>
    </slot>
  </span>
</template>
