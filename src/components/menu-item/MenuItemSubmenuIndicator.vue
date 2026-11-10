<script setup lang="ts">
import { menuItemVariants } from '@heroui/styles'
import { inject } from 'vue'
import { IconChevronRight } from '../icons'
import { menuItemKey } from '../menu/context'

const item = inject(menuItemKey)!
</script>

<template>
  <span v-if="item.hasSubmenu" aria-hidden="true" data-slot="submenu-indicator" :class="menuItemVariants().submenuIndicator()">
    <slot>
      <IconChevronRight />
    </slot>
  </span>
</template>
