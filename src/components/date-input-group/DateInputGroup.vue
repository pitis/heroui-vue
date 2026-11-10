<script setup lang="ts">
import type { DateInputGroupVariants } from '@heroui/styles'
import { dateInputGroupVariants } from '@heroui/styles'
import { PopoverAnchor } from 'reka-ui'
import type { SetupContext } from 'vue'
import { inject, shallowRef } from 'vue'
import { fieldStateAttrs, useField } from '../../utils/field'
import { pickerAnchorKey } from './context'

defineProps<{ variant?: DateInputGroupVariants['variant'], fullWidth?: boolean }>()

const field = useField()
const focusWithin = shallowRef(false)
// inside a date picker, the popover is positioned against this group
const isAnchor = inject(pickerAnchorKey, false)
const Passthrough = (_: unknown, { slots }: SetupContext) => slots.default?.()
</script>

<template>
  <component :is="isAnchor ? PopoverAnchor : Passthrough" v-bind="isAnchor ? { asChild: true } : {}">
    <div
      data-slot="date-input-group"
      :class="dateInputGroupVariants({ fullWidth, variant }).base()"
      :data-focus-within="focusWithin || undefined"
      v-bind="field ? fieldStateAttrs(field) : {}"
      @focusin="focusWithin = true"
      @focusout="focusWithin = false"
    >
      <slot />
    </div>
  </component>
</template>
