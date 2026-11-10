<script setup lang="ts">
import { menuItemVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { menuItemKey, menuKey } from '../menu/context'

withDefaults(defineProps<{ type?: 'checkmark' | 'dot' }>(), { type: 'checkmark' })

const menu = inject(menuKey)!
const item = inject(menuItemKey)!
const selected = computed(() => menu.isSelected(item.id))
</script>

<template>
  <span aria-hidden="true" data-slot="menu-item-indicator" :class="menuItemVariants().indicator()" :data-type="type" :data-visible="selected || undefined">
    <slot :is-selected="selected">
      <svg v-if="type === 'dot'" aria-hidden="true" data-slot="menu-item-indicator--dot" fill="currentColor" fill-rule="evenodd" role="presentation" viewBox="0 0 16 16">
        <path clip-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" fill-rule="evenodd" />
      </svg>
      <svg
        v-else
        aria-hidden="true"
        data-slot="menu-item-indicator--checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        stroke-dasharray="22"
        :stroke-dashoffset="selected ? 44 : 66"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 17 18"
      >
        <polyline points="1 9 7 14 15 4" />
      </svg>
    </slot>
  </span>
</template>
