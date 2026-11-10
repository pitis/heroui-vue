<script setup lang="ts">
import { disclosureVariants } from '@heroui/styles'
import { toRef } from 'vue'
import { useDisclosure } from './useDisclosure'

const props = defineProps<{
  /** Key of this disclosure inside a DisclosureGroup. */
  id?: string
  isDisabled?: boolean
}>()

/** Expanded state when standalone (`v-model:expanded`); inside a group, the group owns it. */
const expanded = defineModel<boolean>('expanded', { default: false })

const slots = disclosureVariants()
const { isExpanded, isDisabled } = useDisclosure(props, toRef(expanded), {
  prefix: 'disclosure',
  classes: { heading: slots.heading(), trigger: slots.trigger(), panel: slots.content(), body: slots.body(), bodyInner: slots.bodyInner(), indicator: slots.indicator() },
})
</script>

<template>
  <div
    data-slot="disclosure"
    :class="slots.base()"
    :data-expanded="isExpanded || undefined"
    :data-disabled="isDisabled || undefined"
  >
    <slot :is-expanded="isExpanded" />
  </div>
</template>
