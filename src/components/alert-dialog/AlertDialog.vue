<script setup lang="ts">
import type { ModalContext } from '../modal/context'
import { alertDialogVariants } from '@heroui/styles'
import ModalRoot from '../modal/Modal.vue'

// A Modal with alert-dialog styling, role="alertdialog", and no outside-click or Escape dismissal by default.
defineOptions({ inheritAttrs: false })

const open = defineModel<boolean>('open', { default: false })
const look: ModalContext['look'] = { prefix: 'alert-dialog', variants: alertDialogVariants as unknown as ModalContext['look']['variants'] }
</script>

<template>
  <ModalRoot v-model:open="open" :look="look">
    <template #default="scope">
      <slot v-bind="scope" />
    </template>
  </ModalRoot>
</template>
