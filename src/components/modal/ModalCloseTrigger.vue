<script setup lang="ts">
import { DialogClose } from 'reka-ui'
import { inject } from 'vue'
import { CloseButton } from '../close-button'
import { modalKey } from './context'

const { look } = inject(modalKey)!
</script>

<template>
  <DialogClose as-child>
    <CloseButton slot="close" :data-slot="`${look.prefix}-close-trigger`" :class="look.variants().closeTrigger()">
      <slot />
    </CloseButton>
  </DialogClose>
</template>
