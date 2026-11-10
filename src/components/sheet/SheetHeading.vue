<script setup lang="ts">
import { sheetVariants } from '@heroui/styles'
import { DialogTitle } from 'reka-ui'
</script>

<template>
  <DialogTitle data-slot="sheet-heading" :class="sheetVariants().heading()">
    <slot />
  </DialogTitle>
</template>
