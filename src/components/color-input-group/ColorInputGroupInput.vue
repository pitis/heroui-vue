<script setup lang="ts">
import { colorInputGroupVariants } from '@heroui/styles'
import { ColorFieldInput } from 'reka-ui'
import { inject } from 'vue'
import { fieldControlAttrs, useField } from '../../utils/field'
import { inColorFieldKey } from './context'

const inColorField = inject(inColorFieldKey, false)
const field = useField()
</script>

<template>
  <!-- inside a ColorField, Reka's input parses and commits the color (on blur / Enter), with arrow-key steps -->
  <ColorFieldInput v-if="inColorField" data-slot="color-input-group-input" :class="colorInputGroupVariants().input()" v-bind="fieldControlAttrs(field)" />
  <input v-else data-slot="color-input-group-input" :class="colorInputGroupVariants().input()" v-bind="fieldControlAttrs(field)">
</template>
