<script setup lang="ts">
import type { CheckboxGroupVariants } from '@heroui/styles'
import { checkboxGroupVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { checkboxGroupKey } from './context'

const props = withDefaults(defineProps<{
  variant?: CheckboxGroupVariants['variant']
  /** Form field name shared by every Checkbox in the group. */
  name?: string
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
}>(), { isDisabled: undefined, isInvalid: undefined, isReadOnly: undefined })

/** The `value`s of the selected checkboxes. */
const model = defineModel<string[]>({ default: () => [] })

const field = provideField(props)

provide(checkboxGroupKey, {
  variant: computed(() => props.variant),
  isDisabled: computed(() => props.isDisabled),
  isReadOnly: computed(() => props.isReadOnly),
  isInvalid: computed(() => props.isInvalid),
  name: computed(() => props.name),
  has: value => model.value.includes(value),
  set: (value, selected) => {
    model.value = selected ? [...model.value, value] : model.value.filter(v => v !== value)
  },
})
</script>

<template>
  <div
    role="group"
    data-slot="checkbox-group"
    :class="checkboxGroupVariants({ variant })"
    :aria-labelledby="field.labelId"
    :aria-describedby="`${field.descriptionId} ${field.errorId}`"
    v-bind="fieldStateAttrs(props)"
  >
    <slot />
  </div>
</template>
