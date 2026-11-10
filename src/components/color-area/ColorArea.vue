<script setup lang="ts">
import type { ColorChannel, ColorSpace } from 'reka-ui'
import type { ColorValue } from '../color-picker/context'
import { colorAreaVariants } from '@heroui/styles'
import { ColorAreaArea, ColorAreaRoot } from 'reka-ui'
import { computed, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { toCssColor, useColorValue } from '../color-picker/context'
import { useDragging } from '../color-picker/useDragging'
import { colorAreaKey } from './context'

const props = defineProps<{
  colorSpace?: ColorSpace
  xChannel?: ColorChannel
  yChannel?: ColorChannel
  /** Dotted overlay pattern. */
  showDots?: boolean
  xName?: string
  yName?: string
  isDisabled?: boolean
}>()

const own = defineModel<ColorValue>()
const model = useColorValue(own)
const { dragging, start } = useDragging()
provide(colorAreaKey, { css: computed(() => toCssColor(model.value)), dragging, isDisabled: computed(() => props.isDisabled) })

// Reka gives backgroundImage (+ backgroundColor); @heroui/styles reads one `background` shorthand
// (a color may close the last layer: "gradient, gradient color")
function background(style: Record<string, unknown>) {
  return (style.background as string | undefined) ?? [style.backgroundImage, style.backgroundColor].filter(Boolean).join(' ')
}
</script>

<template>
  <!-- Reka's root computes the gradient (slot prop) and its area handles pointer input -->
  <ColorAreaRoot
    v-slot="{ style }"
    v-model="model"
    as-child
    :color-space="colorSpace"
    :x-channel="xChannel"
    :y-channel="yChannel"
    :x-name="xName"
    :y-name="yName"
    :disabled="isDisabled"
  >
    <ColorAreaArea as-child>
      <Bridge
        data-slot="color-area"
        :class="colorAreaVariants({ showDots }).base()"
        :style="{ '--color-area-background': background(style as Record<string, unknown>) }"
        :data-disabled="isDisabled || undefined"
        @pointerdown="start"
      >
        <slot />
      </Bridge>
    </ColorAreaArea>
  </ColorAreaRoot>
</template>
