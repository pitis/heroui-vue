<script setup lang="ts">
import type { AlertDialogVariants } from '@heroui/styles'
import { alertDialogVariants } from '@heroui/styles'
import { computed } from 'vue'
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from '../icons'

const props = withDefaults(defineProps<{ status?: AlertDialogVariants['status'] }>(), { status: 'danger' })

const icon = computed(() => ({ success: SuccessIcon, warning: WarningIcon, danger: DangerIcon })[props.status as string] ?? InfoIcon)
</script>

<template>
  <div data-slot="alert-dialog-icon" :class="alertDialogVariants({ status }).icon()">
    <slot>
      <component :is="icon" data-slot="alert-dialog-default-icon" />
    </slot>
  </div>
</template>
