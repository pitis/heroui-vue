<script setup lang="ts">
import type { ToastContentValue } from './queue'
import { computed, inject } from 'vue'
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from '../icons'
import { toastItemKey } from './context'

const props = defineProps<{ variant?: ToastContentValue['variant'] }>()

const item = inject(toastItemKey)!
const icon = computed(() => ({ success: SuccessIcon, warning: WarningIcon, danger: DangerIcon })[(props.variant ?? item.toast.content.variant) as string] ?? InfoIcon)
</script>

<template>
  <div data-slot="toast-indicator" :class="item.slots.indicator()">
    <slot>
      <component :is="icon" data-slot="toast-default-icon" />
    </slot>
  </div>
</template>
