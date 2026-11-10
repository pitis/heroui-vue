<script setup lang="ts">
import { labelVariants } from '@heroui/styles'
import { useField } from '../../utils/field'

defineProps<{ isDisabled?: boolean, isInvalid?: boolean, isRequired?: boolean }>()

// inside a field: points at its control; the field decides whether this is a <label> or a <span>
const field = useField()
</script>

<template>
  <component
    :is="field?.labelAs ?? 'label'"
    :id="field?.labelId"
    :for="field && field.labelAs === 'label' ? field.id : undefined"
    data-slot="label"
    :class="labelVariants({ isDisabled, isInvalid, isRequired })"
  >
    <slot />
  </component>
</template>
