<script setup lang="ts">
import { listboxSectionVariants } from '@heroui/styles'
import { ComboboxGroup, ComboboxLabel, ListboxGroup, ListboxGroupLabel, SelectGroup, SelectLabel } from 'reka-ui'
import { inject, provide } from 'vue'
import { collectionKindKey, sectionLabelKey } from '../list-box/context'

// A labelled group of items; put a <Header> inside as its label.
const kind = inject(collectionKindKey, 'listbox')
const [group, label] = ({ listbox: [ListboxGroup, ListboxGroupLabel], select: [SelectGroup, SelectLabel], combobox: [ComboboxGroup, ComboboxLabel] } as const)[kind]
provide(sectionLabelKey, label)
</script>

<template>
  <component :is="group" :class="listboxSectionVariants()" data-slot="list-box-section">
    <slot />
  </component>
</template>
