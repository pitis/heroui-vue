<script setup lang="ts">
import type { NumberFieldVariants } from '@heroui/styles'
import { numberFieldVariants } from '@heroui/styles'
import { NumberFieldRoot } from 'reka-ui'
import { computed, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { numberFieldKey } from './context'

const props = defineProps<{
  variant?: NumberFieldVariants['variant']
  fullWidth?: boolean
  minValue?: number
  maxValue?: number
  step?: number
  /** Display format, e.g. `{ style: 'currency', currency: 'EUR' }`. */
  formatOptions?: Intl.NumberFormatOptions
  name?: string
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
}>()

const model = defineModel<number>()

provideField(props)
const slots = computed(() => numberFieldVariants({ fullWidth: props.fullWidth, variant: props.variant }))
provide(numberFieldKey, slots)
</script>

<template>
  <!-- Reka supplies parsing/formatting, arrow keys, wheel and the stepper buttons' logic -->
  <NumberFieldRoot
    v-model="model"
    as-child
    :min="minValue"
    :max="maxValue"
    :step="step"
    :format-options="formatOptions"
    :name="name"
    :disabled="isDisabled"
    :readonly="isReadOnly"
    :required="isRequired"
  >
    <Bridge data-slot="number-field" :class="slots.base()" v-bind="fieldStateAttrs(props)">
      <slot />
    </Bridge>
  </NumberFieldRoot>
</template>
