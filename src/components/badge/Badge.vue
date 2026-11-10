<script setup lang="ts">
import type { BadgeVariants } from '@heroui/styles'
import { badgeVariants } from '@heroui/styles'
import { computed } from 'vue'
import { isTextOnly } from '../../utils/part'

const props = defineProps<{
  color?: BadgeVariants['color']
  placement?: BadgeVariants['placement']
  size?: BadgeVariants['size']
  variant?: BadgeVariants['variant']
}>()

const slots = computed(() => badgeVariants({ color: props.color, placement: props.placement, size: props.size, variant: props.variant }))
</script>

<template>
  <span data-slot="badge" :class="slots.base()">
    <span v-if="isTextOnly($slots.default?.())" data-slot="badge-label" :class="slots.label()"><slot /></span>
    <slot v-else />
  </span>
</template>
