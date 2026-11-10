<script setup lang="ts">
import { accordionVariants } from '@heroui/styles'
import { inject, toRef } from 'vue'
import { disclosureGroupKey } from '../disclosure/context'
import { useDisclosure } from '../disclosure/useDisclosure'

const props = defineProps<{
  /** Key of this item in the Accordion's `v-model:expandedKeys`. */
  id?: string
  isDisabled?: boolean
}>()

const accordion = inject(disclosureGroupKey)!
const { isExpanded, isDisabled } = useDisclosure(props, toRef(false), accordion.look!)
</script>

<template>
  <div
    data-slot="accordion-item"
    :class="accordionVariants().item()"
    :data-expanded="isExpanded || undefined"
    :data-disabled="isDisabled || undefined"
    :data-hide-separator="accordion.hideSeparator?.value || undefined"
  >
    <slot :is-expanded="isExpanded" />
  </div>
</template>
