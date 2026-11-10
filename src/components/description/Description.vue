<script setup lang="ts">
import { descriptionVariants } from '@heroui/styles'
import { useField } from '../../utils/field'

const field = useField()
</script>

<template>
  <span :id="field?.descriptionId" data-slot="description" :class="descriptionVariants()">
    <slot />
  </span>
</template>
