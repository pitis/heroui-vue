<script setup lang="ts">
import type { SeparatorVariants } from '@heroui/styles'
import { separatorVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { separatorOrientationKey } from './context'

const props = defineProps<{
  orientation?: 'horizontal' | 'vertical'
  variant?: SeparatorVariants['variant']
  /** Purely visual: hidden from assistive technology. */
  isDecorative?: boolean
}>()

const inherited = inject(separatorOrientationKey, () => 'horizontal' as const)
const orientation = computed(() => props.orientation ?? inherited())
</script>

<template>
  <component
    :is="orientation === 'vertical' ? 'div' : 'hr'"
    data-slot="separator"
    :class="separatorVariants({ orientation, variant })"
    :data-orientation="orientation"
    :role="isDecorative ? 'presentation' : orientation === 'vertical' ? 'separator' : undefined"
    :aria-orientation="!isDecorative && orientation === 'vertical' ? 'vertical' : undefined"
    :aria-hidden="isDecorative || undefined"
  />
</template>
