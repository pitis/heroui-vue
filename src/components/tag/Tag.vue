<script setup lang="ts">
import { tagVariants } from '@heroui/styles'
import { TagGroupItem } from 'reka-ui'
import { computed, inject, useSlots } from 'vue'
import { tagGroupKey } from '../tag-group/context'
import TagRemoveButton from './TagRemoveButton.vue'

// Must sit inside TagGroup.List. A custom Tag.RemoveButton can go in the `remove` slot.
const props = defineProps<{
  id: string
  /** Text used for typeahead and the accessible name; defaults to the tag's text. */
  textValue?: string
  isDisabled?: boolean
}>()

const group = inject(tagGroupKey)!
const slots = useSlots()
const text = computed(() => props.textValue ?? slots.default?.().map(node => (typeof node.children === 'string' ? node.children : '')).join('').trim())
</script>

<template>
  <TagGroupItem
    :value="id"
    :text-value="text"
    :disabled="isDisabled"
    data-slot="tag"
    :class="tagVariants({ size: group.size, variant: group.variant }).base()"
  >
    <slot />
    <slot v-if="group.remove" name="remove">
      <TagRemoveButton />
    </slot>
  </TagGroupItem>
</template>
