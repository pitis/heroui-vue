<script setup lang="ts">
import { NumberFieldInput as RekaNumberFieldInput } from 'reka-ui'
import { inject } from 'vue'
import { fieldControlAttrs, useField } from '../../utils/field'
import { numberFieldKey } from './context'

const slots = inject(numberFieldKey)!
const field = useField()
</script>

<template>
  <RekaNumberFieldInput data-slot="number-field-input" :class="slots.input()" v-bind="fieldControlAttrs(field)" />
</template>
