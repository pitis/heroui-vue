<script setup lang="ts">
import { checkboxVariants } from '@heroui/styles'
import { inject } from 'vue'
import { checkboxKey } from './context'

const checkbox = inject(checkboxKey)!
</script>

<template>
  <span aria-hidden="true" data-slot="checkbox-indicator" :class="checkboxVariants().indicator()">
    <slot :is-selected="checkbox.isSelected.value" :is-indeterminate="checkbox.isIndeterminate.value">
      <!-- the stroke offset drives the draw-in animation defined in @heroui/styles -->
      <svg
        aria-hidden="true"
        data-slot="checkbox-default-indicator--checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        stroke-dasharray="22"
        :stroke-dashoffset="checkbox.isSelected.value ? 44 : 66"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 17 18"
      >
        <polyline points="1 9 7 14 15 4" />
      </svg>
      <svg
        v-if="checkbox.isIndeterminate.value"
        aria-hidden="true"
        data-slot="checkbox-default-indicator--indeterminate"
        fill="none"
        role="presentation"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="3"
        viewBox="0 0 24 24"
      >
        <line x1="21" x2="3" y1="12" y2="12" />
      </svg>
    </slot>
  </span>
</template>
