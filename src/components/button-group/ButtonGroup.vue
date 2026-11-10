<script setup lang="ts">
import type { ButtonVariants } from '@heroui/styles'
import { buttonGroupVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { buttonGroupKey } from './context'

const props = withDefaults(defineProps<{
  /** Applied to every Button inside that doesn't set its own. */
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  orientation?: 'horizontal' | 'vertical'
  fullWidth?: boolean
  isDisabled?: boolean
}>(), { orientation: 'horizontal', fullWidth: undefined, isDisabled: undefined })

provide(buttonGroupKey, computed(() => ({
  variant: props.variant,
  size: props.size,
  fullWidth: props.fullWidth,
  isDisabled: props.isDisabled,
})))
</script>

<template>
  <div
    role="group"
    data-slot="button-group"
    :class="buttonGroupVariants({ fullWidth, orientation }).base()"
    :data-orientation="orientation"
    :data-disabled="isDisabled || undefined"
  >
    <slot />
  </div>
</template>
