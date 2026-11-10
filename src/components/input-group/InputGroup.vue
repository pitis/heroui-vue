<script setup lang="ts">
import type { InputGroupVariants } from '@heroui/styles'
import { inputGroupVariants } from '@heroui/styles'
import { inject } from 'vue'
import { fieldStateAttrs, useField } from '../../utils/field'
import { inputVariantKey } from '../input/context'

defineProps<{ variant?: InputGroupVariants['variant'], fullWidth?: boolean }>()

// state (invalid, disabled) and variant come from an enclosing TextField
const field = useField()
const inheritedVariant = inject(inputVariantKey, undefined)

// clicking the prefix/suffix area focuses the input, as if the whole group were the field
function focusInput(event: MouseEvent) {
  const group = event.currentTarget as HTMLElement
  const input = group.querySelector<HTMLElement>('input, textarea')
  if (input && !input.contains(event.target as Node) && !(event.target as Element).closest('button, a, [role="button"]'))
    input.focus()
}
</script>

<template>
  <div
    role="group"
    data-slot="input-group"
    :class="inputGroupVariants({ fullWidth, variant: variant ?? inheritedVariant }).base()"
    v-bind="field ? fieldStateAttrs(field) : {}"
    @click="focusInput"
  >
    <slot />
  </div>
</template>
