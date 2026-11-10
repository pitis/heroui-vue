<script setup lang="ts">
import type { ChipVariants } from '@heroui/styles'
import { chipVariants } from '@heroui/styles'
import { computed } from 'vue'
import { isTextOnly } from '../../utils/part'

const props = defineProps<{
  color?: ChipVariants['color']
  size?: ChipVariants['size']
  variant?: ChipVariants['variant']
}>()

const slots = computed(() => chipVariants({ color: props.color, size: props.size, variant: props.variant }))
</script>

<template>
  <span data-slot="chip" :class="slots.base()">
    <span v-if="isTextOnly($slots.default?.())" data-slot="chip-label" :class="slots.label()"><slot /></span>
    <slot v-else />
  </span>
</template>
