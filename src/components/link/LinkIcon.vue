<script setup lang="ts">
import { linkVariants } from '@heroui/styles'
import { ExternalLinkIcon } from '../icons'
</script>

<template>
  <span data-slot="link-icon" :class="linkVariants().icon()" :data-default-icon="!$slots.default || undefined">
    <slot>
      <ExternalLinkIcon data-slot="link-default-icon" />
    </slot>
  </span>
</template>
