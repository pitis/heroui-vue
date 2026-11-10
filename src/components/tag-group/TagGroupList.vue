<script setup lang="ts">
import { tagGroupVariants } from '@heroui/styles'
import { TagGroupRoot } from 'reka-ui'
import { inject } from 'vue'
import { useField } from '../../utils/field'
import { tagGroupKey } from './context'

// The grid of tags: Reka supplies roving focus, selection, and Delete/Backspace removal.
const group = inject(tagGroupKey)!
const field = useField()
</script>

<template>
  <TagGroupRoot
    :model-value="group.selected"
    :selection-mode="group.selectionMode"
    :disallow-empty-selection="group.disallowEmptySelection"
    :disabled="group.isDisabled"
    data-slot="tag-group-list"
    :class="tagGroupVariants().list()"
    :aria-labelledby="field?.labelId"
    :aria-describedby="field && `${field.descriptionId} ${field.errorId}`"
    v-bind="group.remove ? { onRemove: (keys: unknown[]) => group.remove!(keys as string[]) } : {}"
    @update:model-value="group.select($event as string | string[] | undefined)"
  >
    <slot />
  </TagGroupRoot>
</template>
