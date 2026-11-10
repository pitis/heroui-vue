<script setup lang="ts">
import { linkVariants } from '@heroui/styles'

defineProps<{ isDisabled?: boolean }>()
</script>

<template>
  <!-- a disabled link keeps its href for context but is not followed or focusable -->
  <a
    data-slot="link"
    :class="linkVariants().base()"
    :aria-disabled="isDisabled || undefined"
    :tabindex="isDisabled ? -1 : undefined"
    @click="isDisabled && $event.preventDefault()"
  >
    <slot />
  </a>
</template>
