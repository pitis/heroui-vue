<script setup lang="ts">
import { inject, shallowRef } from 'vue'
import { fieldStateAttrs, useField } from '../../utils/field'
import { numberFieldKey } from './context'

const slots = inject(numberFieldKey)!
const field = useField()
const focusWithin = shallowRef(false)
</script>

<template>
  <div
    role="group"
    data-slot="number-field-group"
    :class="slots.group()"
    :data-focus-within="focusWithin || undefined"
    v-bind="field ? fieldStateAttrs(field) : {}"
    @focusin="focusWithin = true"
    @focusout="focusWithin = false"
  >
    <slot />
  </div>
</template>
