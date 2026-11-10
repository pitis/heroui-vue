<script setup lang="ts">
import { ColorArea, ColorField, ColorPicker, ColorSlider, ColorSwatch, ColorSwatchPicker, Label } from 'heroui-vue'
import { ref } from 'vue'

const color = ref('#3b82f6')
const presets = ['#f43f5e', '#f97316', '#22c55e', '#3b82f6', '#a855f7']
</script>

<template>
  <ColorPicker v-model="color">
    <ColorPicker.Trigger>
      <ColorSwatch size="sm" />
      <Label>Theme color</Label>
    </ColorPicker.Trigger>
    <ColorPicker.Popover class="flex w-64 flex-col gap-3 p-3">
      <ColorArea color-space="hsb" x-channel="saturation" y-channel="brightness" class="max-w-none">
        <ColorArea.Thumb />
      </ColorArea>
      <ColorSlider channel="hue" color-space="hsb">
        <ColorSlider.Track>
          <ColorSlider.Thumb />
        </ColorSlider.Track>
      </ColorSlider>
      <ColorField aria-label="Hex">
        <ColorField.Group>
          <ColorField.Prefix>
            <ColorSwatch size="xs" />
          </ColorField.Prefix>
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>
      <ColorSwatchPicker size="xs" aria-label="Presets">
        <ColorSwatchPicker.Item v-for="preset in presets" :key="preset" :color="preset">
          <ColorSwatchPicker.Swatch />
          <ColorSwatchPicker.Indicator />
        </ColorSwatchPicker.Item>
      </ColorSwatchPicker>
    </ColorPicker.Popover>
  </ColorPicker>
  <p class="text-sm text-muted">
    Color: {{ color }}
  </p>
</template>
