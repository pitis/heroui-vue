<script setup lang="ts">
import { EmptyState } from 'heroui-vue'
</script>

<template>
  <div class="flex gap-4">
    <EmptyState class="w-64 rounded-2xl border border-dashed border-border p-6" />
    <EmptyState class="w-64 rounded-2xl border border-dashed border-border p-6">
      No messages yet
    </EmptyState>
  </div>
</template>
