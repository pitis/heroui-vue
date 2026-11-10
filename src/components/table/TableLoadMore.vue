<script setup lang="ts">
import { tableVariants } from '@heroui/styles'
</script>

<template>
  <!-- one cell spanning the whole row, for a "Load more" button or a spinner -->
  <tr data-slot="table-load-more" :class="tableVariants().loadMore()">
    <td colspan="1000">
      <slot />
    </td>
  </tr>
</template>
