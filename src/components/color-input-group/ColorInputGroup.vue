<script setup lang="ts">
import type { ColorInputGroupVariants } from '@heroui/styles'
import { colorInputGroupVariants } from '@heroui/styles'
import { shallowRef } from 'vue'
import { fieldStateAttrs, useField } from '../../utils/field'

defineProps<{ variant?: ColorInputGroupVariants['variant'], fullWidth?: boolean }>()

const field = useField()
const focusWithin = shallowRef(false)
</script>

<template>
  <div
    role="group"
    data-slot="color-input-group"
    :class="colorInputGroupVariants({ fullWidth, variant }).base()"
    :data-focus-within="focusWithin || undefined"
    v-bind="field ? fieldStateAttrs(field) : {}"
    @focusin="focusWithin = true"
    @focusout="focusWithin = false"
  >
    <slot />
  </div>
</template>
