<script setup lang="ts">
import type { SearchFieldVariants } from '@heroui/styles'
import { searchFieldVariants } from '@heroui/styles'
import { computed, inject, provide, reactive, watch } from 'vue'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { collectionFilterKey } from '../list-box/context'
import { searchFieldKey } from './context'

const props = defineProps<{
  variant?: SearchFieldVariants['variant']
  fullWidth?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
}>()

const emit = defineEmits<{
  /** Enter pressed in the input. */
  submit: [value: string]
  /** The clear button or Escape emptied the field. */
  clear: []
}>()

const model = defineModel<string>({ default: '' })

// inside Autocomplete.Filter, the text filters the list next to it
const filter = inject(collectionFilterKey, undefined)
if (filter)
  watch(model, value => (filter.query = value), { immediate: true })

provideField(props)
const slots = computed(() => searchFieldVariants({ fullWidth: props.fullWidth, variant: props.variant }))

provide(searchFieldKey, reactive({
  value: model,
  slots,
  clear() {
    model.value = ''
    emit('clear')
  },
  submit: () => emit('submit', model.value),
  inFilter: !!filter,
}))
</script>

<template>
  <div data-slot="search-field" :class="slots.base()" :data-empty="!model || undefined" v-bind="fieldStateAttrs(props)">
    <slot />
  </div>
</template>
