<script setup lang="ts">
import { Chip } from 'heroui-vue'

const colors = ['default', 'accent', 'success', 'warning', 'danger'] as const
const variants = ['primary', 'secondary', 'soft', 'tertiary'] as const
</script>

<template>
  <div v-for="variant in variants" :key="variant" class="flex flex-wrap items-center gap-2">
    <Chip v-for="color in colors" :key="color" :color="color" :variant="variant">
      {{ color }}
    </Chip>
  </div>
  <div class="flex items-center gap-2">
    <Chip v-for="size in (['sm', 'md', 'lg'] as const)" :key="size" :size="size" color="accent">
      <span class="size-1.5 rounded-full bg-current" />
      <Chip.Label>{{ size }}</Chip.Label>
    </Chip>
  </div>
</template>
