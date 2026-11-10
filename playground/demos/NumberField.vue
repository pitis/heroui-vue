<script setup lang="ts">
import { Description, Label, NumberField } from 'heroui-vue'
import { ref } from 'vue'

const quantity = ref(2)
const price = ref(19.99)
</script>

<template>
  <div class="flex max-w-xs flex-col gap-4">
    <NumberField v-model="quantity" :min-value="0" :max-value="10">
      <Label>Quantity ({{ quantity }})</Label>
      <NumberField.Group>
        <NumberField.DecrementButton />
        <NumberField.Input />
        <NumberField.IncrementButton />
      </NumberField.Group>
      <Description>Between 0 and 10.</Description>
    </NumberField>
    <NumberField v-model="price" :step="0.5" :format-options="{ style: 'currency', currency: 'EUR' }" variant="secondary">
      <Label>Price</Label>
      <NumberField.Group>
        <NumberField.Input />
        <NumberField.IncrementButton />
      </NumberField.Group>
    </NumberField>
  </div>
</template>
