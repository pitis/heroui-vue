<script setup lang="ts">
import { listboxItemVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { listBoxItemSelectedKey } from '../list-box/context'

const selected = inject(listBoxItemSelectedKey, computed(() => false))
</script>

<template>
  <span aria-hidden="true" data-slot="list-box-item-indicator" :class="listboxItemVariants().indicator()" :data-visible="selected || undefined">
    <slot :is-selected="selected">
      <!-- the stroke offset draws the checkmark in -->
      <svg
        aria-hidden="true"
        data-slot="list-box-item-indicator--checkmark"
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
