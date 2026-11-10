<script setup lang="ts">
import { drawerVariants } from '@heroui/styles'
import { DialogClose } from 'reka-ui'
import { CloseButton } from '../close-button'
</script>

<template>
  <DialogClose as-child>
    <CloseButton slot="close" data-slot="drawer-close-trigger" :class="drawerVariants().closeTrigger()">
      <slot />
    </CloseButton>
  </DialogClose>
</template>
