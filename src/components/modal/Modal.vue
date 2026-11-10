<script setup lang="ts">
import type { ModalContext } from './context'
import { modalVariants } from '@heroui/styles'
import { DialogRoot } from 'reka-ui'
import { provide } from 'vue'
import { modalKey } from './context'

// renders no element of its own
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  /** Internal: AlertDialog reuses this root with its own look. */
  look?: ModalContext['look']
}>()

const open = defineModel<boolean>('open', { default: false })
provide(modalKey, { open, look: props.look ?? { prefix: 'modal', variants: modalVariants as unknown as ModalContext['look']['variants'] } })
</script>

<template>
  <DialogRoot v-model:open="open">
    <slot :open="open" :close="() => (open = false)" />
  </DialogRoot>
</template>
