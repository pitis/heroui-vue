<script setup lang="ts">
import { tableVariants } from '@heroui/styles'
</script>

<template>
  <thead data-slot="table-header" :class="tableVariants().header()">
    <tr>
      <slot />
    </tr>
  </thead>
</template>
