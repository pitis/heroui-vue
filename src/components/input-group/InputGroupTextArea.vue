<script setup lang="ts">
import { inputGroupVariants } from '@heroui/styles'
import { fieldControlAttrs, useField } from '../../utils/field'

const model = defineModel<string>()
const field = useField()
</script>

<template>
  <textarea
    v-model="model"
    data-slot="input-group-textarea"
    :class="inputGroupVariants().input()"
    v-bind="fieldControlAttrs(field)"
    :disabled="field?.isDisabled"
    :readonly="field?.isReadOnly"
    :required="field?.isRequired"
  />
</template>
