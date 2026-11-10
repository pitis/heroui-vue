<script setup lang="ts">
import type { ColorSwatchPickerVariants } from '@heroui/styles'
import type { ColorValue } from '../color-picker/context'
import { colorSwatchPickerVariants } from '@heroui/styles'
import { ColorSwatchPickerRoot } from 'reka-ui'
import { computed, provide, reactive } from 'vue'
import { Bridge } from '../../utils/bridge'
import { toCssColor, useColorValue } from '../color-picker/context'
import { colorSwatchPickerKey } from './context'

const props = defineProps<{
  layout?: ColorSwatchPickerVariants['layout']
  size?: ColorSwatchPickerVariants['size']
  variant?: ColorSwatchPickerVariants['variant']
}>()

const own = defineModel<ColorValue>()
const model = useColorValue(own)
// Reka's picker compares hex strings
const value = computed({ get: () => toCssColor(model.value), set: v => (model.value = v) })

provide(colorSwatchPickerKey, reactive({ slots: computed(() => colorSwatchPickerVariants({ layout: props.layout, size: props.size, variant: props.variant })) }))
</script>

<template>
  <ColorSwatchPickerRoot v-model="value as string" as-child>
    <Bridge data-slot="color-swatch-picker" :class="colorSwatchPickerVariants({ layout, size, variant }).base()">
      <slot />
    </Bridge>
  </ColorSwatchPickerRoot>
</template>
