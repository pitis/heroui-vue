<script setup lang="ts">
import { drawerVariants } from '@heroui/styles'
</script>

<template>
  <div aria-hidden="true" data-slot="drawer-handle" :class="drawerVariants().handle()">
    <div data-slot="drawer-handle-bar" />
  </div>
</template>
