<script setup lang="ts">
import { useStrings } from '../../utils/strings'
import { inject } from 'vue'
import { CloseButton } from '../close-button'
import { toastItemKey, toastRegionKey } from './context'

const region = inject(toastRegionKey)!
const item = inject(toastItemKey)!
const strings = useStrings()
</script>

<template>
  <CloseButton :aria-label="strings.closeNotification" data-slot="toast-close" :class="item.slots.close()" @click="region.queue.close(item.toast.key)" />
</template>
