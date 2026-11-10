<script setup lang="ts">
import type { SelectVariants } from '@heroui/styles'
import { selectVariants } from '@heroui/styles'
import { SelectRoot } from 'reka-ui'
import { computed, provide, reactive, shallowRef, toRef } from 'vue'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { collectionMultipleKey } from '../list-box/context'
import { selectKey } from './context'

// Reka's SelectRoot renders no element: attrs (class, style…) go on the wrapper div
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  variant?: SelectVariants['variant']
  fullWidth?: boolean
  selectionMode?: 'single' | 'multiple'
  placeholder?: string
  name?: string
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  /** Internal: Autocomplete reuses Select with its own classes and data-slot prefix. */
  look?: { prefix: 'autocomplete', variants: typeof selectVariants }
}>(), { selectionMode: 'single', placeholder: 'Select an item' })

const emit = defineEmits<{ clear: [] }>()

/** Selected item `id` (single) or ids (multiple). */
const model = defineModel<string | string[]>()
const open = defineModel<boolean>('open', { default: false })

provideField(props)
const multiple = computed(() => props.selectionMode === 'multiple')
provide(collectionMultipleKey, multiple)
provide(selectKey, reactive({
  slots: computed(() => (props.look?.variants ?? selectVariants)({ fullWidth: props.fullWidth, variant: props.variant })),
  prefix: props.look?.prefix ?? 'select',
  open,
  isEmpty: computed(() => (Array.isArray(model.value) ? !model.value.length : model.value == null || model.value === '')),
  isDisabled: toRef(props, 'isDisabled'),
  placeholder: toRef(props, 'placeholder'),
  clear() {
    model.value = multiple.value ? [] : undefined
    emit('clear')
  },
  clearButtons: shallowRef(0),
}))
</script>

<template>
  <!-- Reka's SelectRoot renders no element (plus a hidden native select for forms) -->
  <SelectRoot
    v-model="model"
    v-model:open="open"
    :multiple="multiple"
    :name="name"
    :disabled="isDisabled"
    :required="isRequired"
  >
    <div :data-slot="look?.prefix ?? 'select'" :class="(look?.variants ?? selectVariants)({ fullWidth, variant }).base()" v-bind="{ ...fieldStateAttrs(props), ...$attrs }">
      <slot :open="open" />
    </div>
  </SelectRoot>
</template>
