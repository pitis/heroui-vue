<script setup lang="ts">
import { ColorField, ColorSwatch, Description, Label } from 'heroui-vue'
import { ref } from 'vue'

const brand = ref('#17c964')
const hue = ref('hsl(210, 80%, 50%)')
</script>

<template>
  <div class="flex max-w-xs flex-col gap-5">
    <ColorField v-model="brand">
      <Label>Brand color</Label>
      <ColorField.Group>
        <ColorField.Prefix>
          <ColorSwatch :color="brand" size="xs" />
        </ColorField.Prefix>
        <ColorField.Input />
      </ColorField.Group>
      <Description>Type a hex value and press Enter. Value: {{ brand }}</Description>
    </ColorField>
    <ColorField v-model="hue" channel="hue" color-space="hsl">
      <Label>Hue only (arrow keys step it)</Label>
      <ColorField.Group variant="secondary">
        <ColorField.Input />
        <ColorField.Suffix>°</ColorField.Suffix>
      </ColorField.Group>
    </ColorField>
  </div>
</template>
