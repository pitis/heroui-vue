<script setup lang="ts">
import { ColorSwatch, ColorSwatchPicker } from 'heroui-vue'
import { ref } from 'vue'

const colors = ['#0485f7', '#17c964', '#f5a524', '#f31260', '#7828c880', 'transparent']
const palette = ['#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#a855f7', '#ffffff']
const picked = ref('#22c55e')
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ColorSwatch v-for="color in colors" :key="color" :color="color" />
    <ColorSwatch v-for="size in (['xs', 'sm', 'md', 'lg', 'xl'] as const)" :key="size" color="#0485f7" :size="size" shape="square" />
  </div>
  <div class="flex flex-col gap-2">
    <ColorSwatchPicker v-model="picked" aria-label="Palette">
      <ColorSwatchPicker.Item v-for="color in palette" :key="color" :color="color" :is-disabled="color === '#eab308'">
        <ColorSwatchPicker.Swatch />
        <ColorSwatchPicker.Indicator />
      </ColorSwatchPicker.Item>
    </ColorSwatchPicker>
    <ColorSwatchPicker v-model="picked" variant="square" size="sm" aria-label="Palette (square)">
      <ColorSwatchPicker.Item v-for="color in palette.slice(0, 5)" :key="color" :color="color">
        <ColorSwatchPicker.Swatch />
        <ColorSwatchPicker.Indicator />
      </ColorSwatchPicker.Item>
    </ColorSwatchPicker>
    <span class="text-sm text-muted">Picked: {{ picked }}</span>
  </div>
</template>
