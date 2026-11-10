<script setup lang="ts">
import { Description, Label, SearchField } from 'heroui-vue'
import { ref } from 'vue'

const query = ref('')
const submitted = ref('')
</script>

<template>
  <div class="flex max-w-sm flex-col gap-4">
    <SearchField v-model="query" @submit="submitted = $event">
      <Label>Search</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder="Search components…" />
        <SearchField.ClearButton />
      </SearchField.Group>
      <Description>Press Enter to search, Escape to clear. {{ submitted && `Last search: ${submitted}` }}</Description>
    </SearchField>
    <SearchField variant="secondary" model-value="Disabled" is-disabled>
      <Label>Disabled</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  </div>
</template>
