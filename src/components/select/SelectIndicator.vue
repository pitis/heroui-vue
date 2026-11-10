<script setup lang="ts">
import { inject } from 'vue'
import { IconChevronDown } from '../icons'
import { selectKey } from './context'

const select = inject(selectKey)!
</script>

<template>
  <span v-if="$slots.default" aria-hidden="true" :data-slot="`${select.prefix}-indicator`" :class="select.slots.indicator()" :data-open="select.open || undefined">
    <slot />
  </span>
  <IconChevronDown v-else :data-slot="`${select.prefix}-default-indicator`" :class="select.slots.indicator()" :data-open="select.open || undefined" />
</template>
