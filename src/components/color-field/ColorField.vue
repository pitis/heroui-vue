<script setup lang="ts">
import type { ColorChannel, ColorSpace } from 'reka-ui'
import type { ColorValue } from '../color-picker/context'
import { colorFieldVariants } from '@heroui/styles'
import { ColorFieldRoot } from 'reka-ui'
import { provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { useColorValue } from '../color-picker/context'
import { inColorFieldKey } from '../color-input-group/context'

const props = defineProps<{
  /** Edit one channel as a number instead of the whole color as hex. */
  channel?: ColorChannel
  colorSpace?: ColorSpace
  placeholder?: string
  name?: string
  fullWidth?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
  isRequired?: boolean
}>()

const own = defineModel<ColorValue>()
const model = useColorValue(own)

provideField(props)
provide(inColorFieldKey, true)
</script>

<template>
  <ColorFieldRoot
    v-model="model"
    as-child
    :channel="channel"
    :color-space="colorSpace"
    :placeholder="placeholder"
    :name="name"
    :disabled="isDisabled"
    :readonly="isReadOnly"
  >
    <Bridge data-slot="color-field" :class="colorFieldVariants({ fullWidth })" :data-required="isRequired || undefined" v-bind="fieldStateAttrs(props)">
      <slot />
    </Bridge>
  </ColorFieldRoot>
</template>
