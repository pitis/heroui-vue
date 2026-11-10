<script setup lang="ts">
import type { RadioGroupVariants } from '@heroui/styles'
import { radioGroupVariants } from '@heroui/styles'
import { RadioGroupRoot } from 'reka-ui'
import { computed, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { radioGroupKey } from './context'

const props = withDefaults(defineProps<{
  variant?: RadioGroupVariants['variant']
  orientation?: 'horizontal' | 'vertical'
  name?: string
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
}>(), { orientation: 'vertical' })

/** `value` of the selected Radio. */
const model = defineModel<string>()

const field = provideField(props)
provide(radioGroupKey, {
  value: computed(() => model.value),
  isDisabled: computed(() => props.isDisabled),
  isInvalid: computed(() => props.isInvalid),
  isReadOnly: computed(() => props.isReadOnly),
})

function select(value: unknown) {
  if (!props.isReadOnly)
    model.value = value as string
}
</script>

<template>
  <!-- Reka supplies role=radiogroup, arrow-key roving focus and the hidden form input -->
  <RadioGroupRoot
    as-child
    :model-value="model"
    :orientation="orientation"
    :name="name"
    :disabled="isDisabled"
    :required="isRequired"
    @update:model-value="select"
  >
    <Bridge
      data-slot="radio-group"
      :class="radioGroupVariants({ variant })"
      :aria-labelledby="field.labelId"
      :aria-describedby="`${field.descriptionId} ${field.errorId}`"
      :aria-invalid="isInvalid || undefined"
      v-bind="fieldStateAttrs(props)"
    >
      <slot />
    </Bridge>
  </RadioGroupRoot>
</template>
