<script setup lang="ts">
import { ColorArea, ColorSlider, ColorSwatch, Label } from 'heroui-vue'
import { ref } from 'vue'

const color = ref('#0485f7')
</script>

<template>
  <div class="flex flex-wrap items-start gap-8">
    <div class="flex w-56 flex-col gap-4">
      <ColorArea v-model="color" color-space="hsb" x-channel="saturation" y-channel="brightness">
        <ColorArea.Thumb />
      </ColorArea>
      <ColorSlider v-model="color" channel="hue" color-space="hsb">
        <Label>Hue</Label>
        <ColorSlider.Output />
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <div class="flex items-center gap-2 text-sm">
        <ColorSwatch :color="color" size="sm" /> {{ color }}
      </div>
    </div>
    <ColorArea model-value="#f5a524" show-dots is-disabled class="w-40">
      <ColorArea.Thumb />
    </ColorArea>
  </div>
</template>
