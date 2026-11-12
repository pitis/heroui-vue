<script setup lang="ts">
import type { ButtonVariants } from '@heroui/styles'
import { buttonVariants } from '@heroui/styles'
import { Primitive } from 'reka-ui'
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
  /** Vue-only: style the single child (a RouterLink, an `<a>`) as the button instead of rendering a `<button>`. */
  asChild?: boolean
}>(), { fullWidth: undefined, isDisabled: undefined })

// unset props inherit from an enclosing ButtonGroup
const group = inject(buttonGroupKey, undefined)

const className = computed(() => buttonVariants({
  variant: props.variant ?? group?.value.variant,
  size: props.size ?? group?.value.size,
  fullWidth: props.fullWidth ?? group?.value.fullWidth,
  isIconOnly: props.isIconOnly,
}))

const disabled = computed(() => props.isDisabled ?? group?.value.isDisabled)
// a link has no `disabled`: it is marked aria-disabled, leaves the Tab order and ignores clicks
const inertLink = computed(() => props.asChild && !!disabled.value)

function onClick(event: MouseEvent) {
  if (props.isPending || inertLink.value) {
    event.preventDefault()
    // runs before the consumer's @click, which Vue then skips
    event.stopImmediatePropagation()
  }
}
</script>

<template>
  <Primitive
    as="button"
    :as-child="asChild"
    :type="asChild ? undefined : 'button'"
    data-slot="button"
    :class="className"
    :disabled="asChild ? undefined : disabled"
    :aria-disabled="isPending || inertLink || undefined"
    :tabindex="inertLink ? -1 : undefined"
    :data-pending="isPending || undefined"
    @click="onClick"
  >
    <slot :is-pending="isPending" />
  </Primitive>
</template>
