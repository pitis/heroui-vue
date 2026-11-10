<script setup lang="ts">
import { inject, onMounted, useTemplateRef } from 'vue'
import { fieldControlAttrs, useField } from '../../utils/field'
import { searchFieldKey } from './context'

const search = inject(searchFieldKey)!
const field = useField()

// in an Autocomplete popover: take focus on open, and keep typed characters away from the Select's typeahead
const input = useTemplateRef<HTMLInputElement>('input')
onMounted(() => search.inFilter && requestAnimationFrame(() => input.value?.focus()))

function onKeydown(event: KeyboardEvent) {
  if (search.inFilter && !['ArrowDown', 'ArrowUp', 'Escape', 'Tab', 'Enter'].includes(event.key))
    event.stopPropagation()
  if (event.key === 'Enter' && !event.isComposing)
    search.submit()
  // Escape empties a non-empty field; on an empty one it propagates (e.g. to close a dialog)
  if (event.key === 'Escape' && search.value && !field?.value.isReadOnly) {
    event.preventDefault()
    event.stopPropagation()
    search.clear()
  }
}
</script>

<template>
  <input
    ref="input"
    v-model="search.value"
    type="search"
    enterkeyhint="search"
    autocomplete="off"
    data-slot="search-field-input"
    :class="search.slots.input()"
    v-bind="fieldControlAttrs(field)"
    :disabled="field?.isDisabled"
    :readonly="field?.isReadOnly"
    :required="field?.isRequired"
    @keydown="onKeydown"
  >
</template>
