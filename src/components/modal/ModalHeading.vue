<script setup lang="ts">
import { DialogTitle } from 'reka-ui'
import { inject } from 'vue'
import { modalKey } from './context'

const { look } = inject(modalKey)!
</script>

<template>
  <!-- labels the dialog -->
  <DialogTitle :data-slot="`${look.prefix}-heading`" :class="look.variants().heading()">
    <slot />
  </DialogTitle>
</template>
