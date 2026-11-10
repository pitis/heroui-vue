<script setup lang="ts">
import { inject } from 'vue'
import { CloseButton } from '../close-button'
import { toastItemKey, toastRegionKey } from './context'

const region = inject(toastRegionKey)!
const item = inject(toastItemKey)!
</script>

<template>
  <CloseButton aria-label="Close notification" data-slot="toast-close" :class="item.slots.close()" @click="region.queue.close(item.toast.key)" />
</template>
