<script setup lang="ts">
import { DialogRoot } from 'reka-ui'
import { provide } from 'vue'
import { drawerKey } from './context'

// renders no element of its own
defineOptions({ inheritAttrs: false })

const open = defineModel<boolean>('open', { default: false })
provide(drawerKey, { open })
</script>

<template>
  <DialogRoot v-model:open="open">
    <slot :open="open" :close="() => (open = false)" />
  </DialogRoot>
</template>
