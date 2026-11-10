<script setup lang="ts">
import { drawerVariants } from '@heroui/styles'
import { DialogTitle } from 'reka-ui'
</script>

<template>
  <DialogTitle data-slot="drawer-heading" :class="drawerVariants().heading()">
    <slot />
  </DialogTitle>
</template>
