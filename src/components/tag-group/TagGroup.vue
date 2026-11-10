<script setup lang="ts">
import type { TagVariants } from '@heroui/styles'
import { tagGroupVariants } from '@heroui/styles'
import { provide, reactive, toRef } from 'vue'
import { provideField } from '../../utils/field'
import { tagGroupKey } from './context'

const props = withDefaults(defineProps<{
  size?: TagVariants['size']
  variant?: TagVariants['variant']
  selectionMode?: 'none' | 'single' | 'multiple'
  disallowEmptySelection?: boolean
  isDisabled?: boolean
  /** Declared as a prop so its presence is known: tags are removable only when you listen to it. */
  onRemove?: (keys: string[]) => void
}>(), { selectionMode: 'none' })

/** Selected tag `id` (single) or ids (multiple). */
const selected = defineModel<string | string[]>()

const field = provideField(props)
provide(tagGroupKey, reactive({
  size: toRef(props, 'size'),
  variant: toRef(props, 'variant'),
  selectionMode: toRef(props, 'selectionMode'),
  disallowEmptySelection: toRef(props, 'disallowEmptySelection'),
  isDisabled: toRef(props, 'isDisabled'),
  selected,
  select: (value: string | string[] | undefined) => (selected.value = value),
  remove: toRef(props, 'onRemove'),
}))
</script>

<template>
  <div data-slot="tag-group" :class="tagGroupVariants().base()" :aria-labelledby="field.labelId">
    <slot />
  </div>
</template>
