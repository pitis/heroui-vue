<script setup lang="ts">
import type { TextAreaVariants } from '@heroui/styles'
import { textAreaVariants } from '@heroui/styles'
import { inject } from 'vue'
import { fieldControlAttrs, useField } from '../../utils/field'
import { inputVariantKey } from '../input/context'

defineProps<{ variant?: TextAreaVariants['variant'], fullWidth?: boolean }>()

const model = defineModel<string>()

const field = useField()
const inheritedVariant = inject(inputVariantKey, undefined)
</script>

<template>
  <textarea
    v-model="model"
    data-slot="textarea"
    :class="textAreaVariants({ fullWidth, variant: variant ?? inheritedVariant })"
    v-bind="fieldControlAttrs(field)"
    :disabled="field?.isDisabled"
    :readonly="field?.isReadOnly"
    :required="field?.isRequired"
    :data-invalid="field?.isInvalid || undefined"
  />
</template>
