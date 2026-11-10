<script setup lang="ts">
import { ComboBox, Description, Input, Label, ListBox } from 'heroui-vue'
import { ref } from 'vue'

const animals = [
  { id: 'cat', name: 'Cat' },
  { id: 'dog', name: 'Dog' },
  { id: 'kangaroo', name: 'Kangaroo' },
  { id: 'koala', name: 'Koala' },
  { id: 'panda', name: 'Panda' },
  { id: 'penguin', name: 'Penguin' },
]
const animal = ref('koala')
const query = ref('')
</script>

<template>
  <ComboBox v-model="animal" class="w-72">
    <Label>Favorite animal</Label>
    <ComboBox.InputGroup>
      <Input v-model="query" placeholder="Search animals…" />
      <ComboBox.Trigger />
    </ComboBox.InputGroup>
    <Description>Selected: {{ animal ?? 'none' }} · typed: "{{ query }}"</Description>
    <ComboBox.Popover>
      <ListBox>
        <ListBox.Item v-for="a in animals" :id="a.id" :key="a.id" :text-value="a.name" :is-disabled="a.id === 'panda'">
          {{ a.name }}
          <ListBox.ItemIndicator />
        </ListBox.Item>
      </ListBox>
    </ComboBox.Popover>
  </ComboBox>
</template>
