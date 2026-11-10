<script setup lang="ts">
import type { ListBoxItemVariants } from '@heroui/styles'
import { listboxItemVariants } from '@heroui/styles'
import { ComboboxItem, ListboxItem, SelectItem, SelectItemText } from 'reka-ui'
import { computed, inject, onBeforeUnmount, useSlots, watchEffect } from 'vue'
import { Bridge } from '../../utils/bridge'
import { collectionFilterKey, collectionKindKey, DISABLED_ITEM_STYLE, itemTextKey } from '../list-box/context'
import ItemScope from './ItemScope'

const props = defineProps<{
  /** Value of this option in the picker's / list's v-model. */
  id: string
  /** Text for typeahead, filtering and the picker's displayed value; defaults to the item's text. */
  textValue?: string
  isDisabled?: boolean
  variant?: ListBoxItemVariants['variant']
}>()

const kind = inject(collectionKindKey, 'listbox')
const item = { listbox: ListboxItem, select: SelectItem, combobox: ComboboxItem }[kind]

const slots = useSlots()
const text = computed(() => props.textValue ?? slots.default?.().map(node => (typeof node.children === 'string' ? node.children : '')).join('').trim())

// inside Autocomplete.Filter: hidden, and disabled so keyboard navigation skips it, when it doesn't match
const filter = inject(collectionFilterKey, undefined)
const matches = computed(() => !filter?.query || !!text.value?.toLocaleLowerCase().includes(filter.query.toLocaleLowerCase()))

const texts = inject(itemTextKey, undefined)
watchEffect(() => text.value && texts?.set(props.id, text.value))
onBeforeUnmount(() => texts?.delete(props.id))
</script>

<template>
  <component :is="item" as-child :value="id" :text-value="text" :disabled="isDisabled || !matches">
    <!-- highlight only where focus stays in an input (combobox): elsewhere Reka moves real focus to the item -->
    <Bridge
      :highlight="kind === 'combobox'"
      data-slot="list-box-item"
      :class="listboxItemVariants({ variant }).item()"
      :style="isDisabled ? DISABLED_ITEM_STYLE : undefined"
      :hidden="!matches || undefined"
    >
      <ItemScope :kind="kind">
        <slot />
      </ItemScope>
      <!-- Reka's Select learns an option's label (shown by Select.Value) from SelectItemText -->
      <SelectItemText v-if="kind === 'select'" hidden>
        {{ text }}
      </SelectItemText>
    </Bridge>
  </component>
</template>
