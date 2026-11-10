<script setup lang="ts">
import type { ButtonVariants } from '@heroui/styles'
import { buttonVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { buttonGroupKey } from '../button-group/context'

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  fullWidth?: boolean
  isIconOnly?: boolean
  isDisabled?: boolean
  /** Busy state: stays focusable, ignores clicks. */
  isPending?: boolean
}>(), { fullWidth: undefined, isDisabled: undefined })

// unset props inherit from an enclosing ButtonGroup
const group = inject(buttonGroupKey, undefined)

const className = computed(() => buttonVariants({
  variant: props.variant ?? group?.value.variant,
  size: props.size ?? group?.value.size,
  fullWidth: props.fullWidth ?? group?.value.fullWidth,
  isIconOnly: props.isIconOnly,
}))

function onClick(event: MouseEvent) {
  if (props.isPending) {
    event.preventDefault()
    // runs before the consumer's @click, which Vue then skips
    event.stopImmediatePropagation()
  }
}
</script>

<template>
  <button
    type="button"
    data-slot="button"
    :class="className"
    :disabled="isDisabled ?? group?.isDisabled"
    :aria-disabled="isPending || undefined"
    :data-pending="isPending || undefined"
    @click="onClick"
  >
    <slot :is-pending="isPending" />
  </button>
</template>
