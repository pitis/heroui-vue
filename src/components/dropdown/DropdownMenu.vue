<script setup lang="ts">
import type { SelectionMode } from '../menu/context'
import { dropdownVariants, menuVariants } from '@heroui/styles'
import MenuRoot from '../menu/Menu.vue'

withDefaults(defineProps<{ selectionMode?: SelectionMode }>(), { selectionMode: 'none' })
const emit = defineEmits<{ action: [id: string] }>()
const model = defineModel<string | string[]>()

const look = { class: `${menuVariants()} ${dropdownVariants().menu()}`, slot: 'dropdown-menu' }
</script>

<template>
  <MenuRoot v-model="model" :selection-mode="selectionMode" :look="look" @action="emit('action', $event)">
    <slot />
  </MenuRoot>
</template>
