<script setup lang="ts">
import { autocompleteVariants } from '@heroui/styles'
import { provide, reactive } from 'vue'
import { collectionFilterKey } from '../list-box/context'

// Wraps a SearchField and a ListBox: what is typed filters the list.
provide(collectionFilterKey, reactive({ query: '' }))
</script>

<template>
  <div data-slot="autocomplete-filter" :class="autocompleteVariants().filter()">
    <slot />
  </div>
</template>
