<script setup lang="ts">
import { inject } from 'vue'
import { modalKey, modalLayoutKey } from './context'

const { look } = inject(modalKey)!
const layout = inject(modalLayoutKey, undefined)
</script>

<template>
  <div :data-slot="`${look.prefix}-body`" :class="look.variants({ scroll: layout?.scroll }).body()">
    <slot />
  </div>
</template>
