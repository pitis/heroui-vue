<script setup lang="ts">
import type { ListBoxVariants } from '@heroui/styles'
import { listboxVariants } from '@heroui/styles'
import { ComboboxViewport, ListboxContent, ListboxRoot, SelectViewport } from 'reka-ui'
import { computed, inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { collectionKindKey, collectionMultipleKey } from './context'

const props = withDefaults(defineProps<{
  variant?: ListBoxVariants['variant']
  /** Standalone only; inside a picker, the picker decides. */
  selectionMode?: 'single' | 'multiple'
  isDisabled?: boolean
}>(), { selectionMode: 'single' })

/** Standalone only: selected `id` (single) or ids (multiple). Inside a picker, use the picker's v-model. */
const model = defineModel<string | string[]>()

const kind = inject(collectionKindKey, 'listbox')
const pickerMultiple = inject(collectionMultipleKey, undefined)
const multiple = computed(() => pickerMultiple?.value ?? props.selectionMode === 'multiple')
const viewport = computed(() => (kind === 'select' ? SelectViewport : ComboboxViewport))
</script>

<template>
  <ListboxRoot
    v-if="kind === 'listbox'"
    v-model="model"
    as-child
    :multiple="multiple"
    :disabled="isDisabled"
  >
    <ListboxContent as-child>
      <Bridge data-slot="list-box" :class="listboxVariants({ variant })">
        <slot />
      </Bridge>
    </ListboxContent>
  </ListboxRoot>
  <component :is="viewport" v-else as-child>
    <Bridge data-slot="list-box" :class="listboxVariants({ variant })" :aria-multiselectable="multiple || undefined">
      <slot />
    </Bridge>
  </component>
</template>
