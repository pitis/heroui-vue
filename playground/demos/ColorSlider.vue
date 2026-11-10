<script setup lang="ts">
import { ColorSlider, Label } from 'heroui-vue'
import { ref } from 'vue'

const color = ref('#7828c8')
const channels = [
  { channel: 'red', colorSpace: 'rgb' },
  { channel: 'green', colorSpace: 'rgb' },
  { channel: 'blue', colorSpace: 'rgb' },
  { channel: 'alpha', colorSpace: 'rgb' },
  { channel: 'lightness', colorSpace: 'hsl' },
] as const
</script>

<template>
  <div class="flex flex-wrap gap-8">
    <div class="flex w-64 flex-col gap-4">
      <ColorSlider v-for="c in channels" :key="c.channel" v-model="color" :channel="c.channel" :color-space="c.colorSpace">
        <Label>{{ c.channel }}</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <span class="text-sm text-muted">{{ color }}</span>
    </div>
    <ColorSlider v-model="color" channel="hue" color-space="hsl" orientation="vertical" class="h-48">
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>
  </div>
</template>
