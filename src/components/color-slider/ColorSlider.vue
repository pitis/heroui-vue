<script setup lang="ts">
import type { ColorChannel, ColorSpace } from 'reka-ui'
import type { ColorValue } from '../color-picker/context'
import { colorSliderVariants } from '@heroui/styles'
import { ColorSliderRoot } from 'reka-ui'
import { computed, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { provideField } from '../../utils/field'
import { useColorValue } from '../color-picker/context'
import { useDragging } from '../color-picker/useDragging'
import { colorSliderKey } from './context'

const props = withDefaults(defineProps<{
  channel: ColorChannel
  colorSpace?: ColorSpace
  orientation?: 'horizontal' | 'vertical'
  name?: string
  isDisabled?: boolean
}>(), { orientation: 'horizontal' })

const own = defineModel<ColorValue>()
const model = useColorValue(own)
const { dragging, start } = useDragging()

provideField(props, 'span')
provide(colorSliderKey, {
  value: model,
  channel: computed(() => props.channel),
  orientation: computed(() => props.orientation),
  isDisabled: computed(() => props.isDisabled),
  dragging,
})
</script>

<template>
  <!-- thumb-alignment overflow (passed to Reka's slider): the thumb centre sits on the value; the CSS adds end caps -->
  <ColorSliderRoot
    v-model="model"
    as-child
    :channel="channel"
    :color-space="colorSpace"
    :orientation="orientation"
    :name="name"
    :disabled="isDisabled"
    thumb-alignment="overflow"
  >
    <Bridge data-slot="color-slider" :class="colorSliderVariants().base()" :data-disabled="isDisabled || undefined" @pointerdown="start">
      <slot />
    </Bridge>
  </ColorSliderRoot>
</template>
