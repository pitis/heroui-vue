<script setup lang="ts">
import { alertVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from '../icons'
import { alertStatusKey } from './context'

const status = inject(alertStatusKey)!
const icon = computed(() => ({ success: SuccessIcon, warning: WarningIcon, danger: DangerIcon })[status.value as string] ?? InfoIcon)
</script>

<template>
  <div data-slot="alert-indicator" :class="alertVariants().indicator()">
    <slot>
      <component :is="icon" data-slot="alert-default-icon" />
    </slot>
  </div>
</template>
