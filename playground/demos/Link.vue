<script setup lang="ts">
import { Link } from 'heroui-vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Link href="#link">
      Default link
    </Link>
    <Link href="https://heroui.com" target="_blank" rel="noopener">
      External
      <Link.Icon />
    </Link>
    <Link href="#disabled" is-disabled>
      Disabled
    </Link>
  </div>
</template>
