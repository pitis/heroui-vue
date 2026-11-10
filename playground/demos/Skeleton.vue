<script setup lang="ts">
import { Skeleton } from 'heroui-vue'
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <div v-for="animationType in (['shimmer', 'pulse', 'none'] as const)" :key="animationType" class="flex w-56 items-center gap-3">
      <Skeleton :animation-type="animationType" class="size-10 shrink-0 rounded-full" />
      <div class="flex w-full flex-col gap-2">
        <Skeleton :animation-type="animationType" class="h-3 w-3/4 rounded-lg" />
        <Skeleton :animation-type="animationType" class="h-3 w-1/2 rounded-lg" />
      </div>
    </div>
  </div>
</template>
