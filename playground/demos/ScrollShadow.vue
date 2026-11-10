<script setup lang="ts">
import { ScrollShadow } from 'heroui-vue'
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <ScrollShadow class="h-48 w-64">
      <p v-for="n in 12" :key="n" class="py-1">
        Paragraph {{ n }}: scroll to see the edges fade.
      </p>
    </ScrollShadow>
    <ScrollShadow orientation="horizontal" hide-scroll-bar class="w-64">
      <div class="flex w-max gap-2">
        <span v-for="n in 15" :key="n" class="rounded-xl bg-default px-4 py-6">{{ n }}</span>
      </div>
    </ScrollShadow>
  </div>
</template>
