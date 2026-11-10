<script setup lang="ts">
import { PopoverRoot } from 'reka-ui'

// renders no element of its own
defineOptions({ inheritAttrs: false })

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <PopoverRoot v-model:open="open">
    <slot :open="open" />
  </PopoverRoot>
</template>
