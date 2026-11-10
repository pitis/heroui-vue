<script setup lang="ts">
import { sheetVariants } from '@heroui/styles'
import { DialogClose } from 'reka-ui'
import { CloseButton } from '../close-button'
</script>

<template>
  <DialogClose as-child>
    <CloseButton data-slot="sheet-close-trigger" :class="sheetVariants().closeTrigger()">
      <slot />
    </CloseButton>
  </DialogClose>
</template>
