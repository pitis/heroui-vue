<script setup lang="ts">
import { InputGroup, Label, TextField } from 'heroui-vue'
import { ref } from 'vue'

const price = ref('')
const site = ref('heroui')
const notes = ref('')
</script>

<template>
  <div class="flex max-w-sm flex-col gap-4">
    <TextField>
      <Label>Price</Label>
      <InputGroup>
        <InputGroup.Prefix>$</InputGroup.Prefix>
        <InputGroup.Input v-model="price" inputmode="decimal" placeholder="0.00" />
        <InputGroup.Suffix>USD</InputGroup.Suffix>
      </InputGroup>
    </TextField>
    <TextField :is-invalid="site.includes(' ')" variant="secondary">
      <Label>Website</Label>
      <InputGroup>
        <InputGroup.Prefix>https://</InputGroup.Prefix>
        <InputGroup.Input v-model="site" />
        <InputGroup.Suffix>.com</InputGroup.Suffix>
      </InputGroup>
    </TextField>
    <TextField>
      <Label>Notes</Label>
      <InputGroup>
        <InputGroup.TextArea v-model="notes" rows="3" placeholder="Anything else?" />
        <InputGroup.Suffix>{{ notes.length }}/200</InputGroup.Suffix>
      </InputGroup>
    </TextField>
  </div>
</template>
