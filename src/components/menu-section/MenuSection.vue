<script setup lang="ts">
import { menuSectionVariants } from '@heroui/styles'
import { DropdownMenuGroup, DropdownMenuLabel } from 'reka-ui'
import { inject, provide } from 'vue'
import { sectionLabelKey } from '../list-box/context'
import { menuKey } from '../menu/context'

// A labelled group of items; put a <Header> inside as its label.
const menu = inject(menuKey)!
if (menu.kind === 'dropdown')
  provide(sectionLabelKey, DropdownMenuLabel)
</script>

<template>
  <DropdownMenuGroup v-if="menu.kind === 'dropdown'" data-slot="menu-section" :class="menuSectionVariants()">
    <slot />
  </DropdownMenuGroup>
  <div v-else role="group" data-slot="menu-section" :class="menuSectionVariants()">
    <slot />
  </div>
</template>
