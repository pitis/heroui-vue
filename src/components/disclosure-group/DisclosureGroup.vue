<script setup lang="ts">
import { disclosureGroupVariants } from '@heroui/styles'
import { useDisclosureGroup } from './useDisclosureGroup'

const props = defineProps<{
  allowsMultipleExpanded?: boolean
  isDisabled?: boolean
}>()

/** `id`s of the expanded Disclosures. */
const expandedKeys = defineModel<string[]>('expandedKeys', { default: () => [] })

useDisclosureGroup(props, expandedKeys)
</script>

<template>
  <div data-slot="disclosure-group" :class="disclosureGroupVariants().base()" :data-disabled="isDisabled || undefined">
    <slot />
  </div>
</template>
