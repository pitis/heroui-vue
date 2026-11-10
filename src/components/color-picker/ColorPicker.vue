<script setup lang="ts">
import type { ColorValue } from './context'
import { colorPickerVariants } from '@heroui/styles'
import { PopoverRoot } from 'reka-ui'
import { provide } from 'vue'
import { colorPickerKey } from './context'

// Shares one color with every color component inside (area, sliders, field, swatches), and holds the popover.
const model = defineModel<ColorValue>({ default: '#000000' })
const open = defineModel<boolean>('open', { default: false })
provide(colorPickerKey, model)
</script>

<template>
  <PopoverRoot v-model:open="open">
    <div data-slot="color-picker" :class="colorPickerVariants().base()">
      <slot :color="model" />
    </div>
  </PopoverRoot>
</template>
