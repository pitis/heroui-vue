<script setup lang="ts">
import type { InputVariants } from '@heroui/styles'
import { textFieldVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { inputVariantKey } from '../input/context'

// Groups Label + Input/TextArea + Description + FieldError and wires them together.
// The value itself is the control's: <Input v-model="…" />.
const props = defineProps<{
  /** Inherited by the Input / TextArea inside. */
  variant?: InputVariants['variant']
  fullWidth?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
}>()

provideField(props)
provide(inputVariantKey, computed(() => props.variant))
</script>

<template>
  <div data-slot="textfield" :class="textFieldVariants({ fullWidth })" v-bind="fieldStateAttrs(props)">
    <slot />
  </div>
</template>
