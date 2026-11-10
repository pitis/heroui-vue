<script setup lang="ts">
import type { SelectVariants } from '@heroui/styles'
import { autocompleteVariants } from '@heroui/styles'
import SelectRoot from '../select/Select.vue'

// A Select whose popover holds a search field (Autocomplete.Filter) that filters its list.
const props = defineProps<{
  variant?: SelectVariants['variant']
  fullWidth?: boolean
  selectionMode?: 'single' | 'multiple'
  placeholder?: string
  name?: string
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
}>()

const emit = defineEmits<{ clear: [] }>()
const model = defineModel<string | string[]>()
const open = defineModel<boolean>('open', { default: false })

const look = { prefix: 'autocomplete' as const, variants: autocompleteVariants as never }
// props are passed one by one: v-bind="$props" would also pass this component's own modelValue/open and pin them
</script>

<template>
  <SelectRoot
    v-model="model"
    v-model:open="open"
    :variant="props.variant"
    :full-width="props.fullWidth"
    :selection-mode="props.selectionMode"
    :placeholder="props.placeholder"
    :name="props.name"
    :is-disabled="props.isDisabled"
    :is-invalid="props.isInvalid"
    :is-required="props.isRequired"
    :look="look"
    @clear="emit('clear')"
  >
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
  </SelectRoot>
</template>
