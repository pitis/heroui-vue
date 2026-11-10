<script setup lang="ts">
import { fieldErrorVariants } from '@heroui/styles'
import { useField } from '../../utils/field'

// inside a field it only shows while the field is invalid
const field = useField()
</script>

<template>
  <span
    v-if="!field || field.isInvalid"
    :id="field?.errorId"
    data-slot="field-error"
    data-visible="true"
    :class="fieldErrorVariants()"
  >
    <slot />
  </span>
</template>
