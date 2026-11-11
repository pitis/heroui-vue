<script setup lang="ts">
import { autocompleteVariants } from '@heroui/styles'
import { provide, reactive, toRef } from 'vue'
import { contains } from '../../utils/filter'
import { collectionFilterKey } from '../list-box/context'

const props = withDefaults(defineProps<{
  /** Whether an item stays in the list for what was typed. Default: its text contains it, ignoring case and accents. */
  filter?: (textValue: string, inputValue: string) => boolean
}>(), { filter: contains })

// Wraps a SearchField and a ListBox: what is typed filters the list.
provide(collectionFilterKey, reactive({ query: '', filter: toRef(props, 'filter') }))
</script>

<template>
  <div data-slot="autocomplete-filter" :class="autocompleteVariants().filter()">
    <slot />
  </div>
</template>
