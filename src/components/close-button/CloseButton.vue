<script setup lang="ts">
import type { CloseButtonVariants } from '@heroui/styles'
import { closeButtonVariants } from '@heroui/styles'
import { CloseIcon } from '../icons'

defineProps<{ variant?: CloseButtonVariants['variant'], isDisabled?: boolean }>()
</script>

<template>
  <button
    type="button"
    aria-label="Close"
    data-slot="close-button"
    :class="closeButtonVariants({ variant })"
    :disabled="isDisabled"
  >
    <slot>
      <CloseIcon data-slot="close-button-icon" />
    </slot>
  </button>
</template>
