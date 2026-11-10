<script setup lang="ts">
import { inject } from 'vue'
import { ColorSwatch } from '../color-swatch'
import { colorSwatchPickerItemKey, colorSwatchPickerKey } from './context'

const picker = inject(colorSwatchPickerKey)!
const item = inject(colorSwatchPickerItemKey)!
</script>

<template>
  <ColorSwatch :color="item.color" data-slot="color-swatch-picker-swatch" :class="picker.slots.swatch()" />
</template>
