<script setup lang="ts">
import { DropdownMenuSub } from 'reka-ui'
import { provide, reactive } from 'vue'
import { submenuKey } from '../menu/context'

// Wraps a Dropdown.Item (the trigger) and a Dropdown.Popover (the submenu).
provide(submenuKey, reactive({ claimed: false }))
</script>

<template>
  <DropdownMenuSub>
    <slot />
  </DropdownMenuSub>
</template>
