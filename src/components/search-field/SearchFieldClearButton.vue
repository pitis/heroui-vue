<script setup lang="ts">
import { inject } from 'vue'
import { useField } from '../../utils/field'
import { CloseButton } from '../close-button'
import { searchFieldKey } from './context'

const search = inject(searchFieldKey)!
const field = useField()

function clear(event: MouseEvent) {
  search.clear()
  // keep editing: focus returns to the input
  ;(event.currentTarget as HTMLElement).closest('[data-slot="search-field"]')?.querySelector<HTMLInputElement>('input')?.focus()
}
</script>

<template>
  <!-- slot="clear" is what the input's padding rule in @heroui/styles looks for; out of tab order like React Aria's -->
  <CloseButton
    slot="clear"
    aria-label="Clear search"
    tabindex="-1"
    data-slot="search-field-clear-button"
    :class="search.slots.clearButton()"
    :is-disabled="field?.isDisabled || field?.isReadOnly"
    @click="clear"
  />
</template>
