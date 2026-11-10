<script setup lang="ts">
import type { AccordionVariants } from '@heroui/styles'
import { accordionVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { useDisclosureGroup } from '../disclosure-group/useDisclosureGroup'
import { surfaceKey } from '../surface/context'

const props = defineProps<{
  variant?: AccordionVariants['variant']
  allowsMultipleExpanded?: boolean
  hideSeparator?: boolean
  isDisabled?: boolean
}>()

/** `id`s of the expanded items. */
const expandedKeys = defineModel<string[]>('expandedKeys', { default: () => [] })

const slots = accordionVariants()
useDisclosureGroup(props, expandedKeys, {
  prefix: 'accordion',
  classes: { heading: slots.heading(), trigger: slots.trigger(), panel: slots.panel(), body: slots.body(), bodyInner: slots.bodyInner(), indicator: slots.indicator() },
})
if (props.variant === 'surface')
  provide(surfaceKey, computed(() => 'default' as const))
</script>

<template>
  <div data-slot="accordion" :class="accordionVariants({ variant }).base()" :data-disabled="isDisabled || undefined">
    <slot />
  </div>
</template>
