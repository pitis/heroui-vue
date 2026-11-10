<script setup lang="ts">
import { dropdownVariants } from '@heroui/styles'
import { DropdownMenuRoot } from 'reka-ui'

// Reka's DropdownMenuRoot renders no element: attrs go on the wrapper div
defineOptions({ inheritAttrs: false })

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <DropdownMenuRoot v-model:open="open">
    <div data-slot="dropdown" :class="dropdownVariants().root()" v-bind="$attrs">
      <slot :open="open" />
    </div>
  </DropdownMenuRoot>
</template>
