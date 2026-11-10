<script setup lang="ts">
import { Autocomplete, Label, ListBox, SearchField } from 'heroui-vue'
import { ref } from 'vue'

const languages = ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Kotlin', 'Swift', 'Ruby']
const language = ref('rust')
</script>

<template>
  <Autocomplete v-model="language" placeholder="Pick a language" class="w-72">
    <Label>Language</Label>
    <Autocomplete.Trigger>
      <Autocomplete.Value />
      <Autocomplete.ClearButton />
      <Autocomplete.Indicator />
    </Autocomplete.Trigger>
    <Autocomplete.Popover>
      <Autocomplete.Filter>
        <SearchField aria-label="Search languages">
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search…" />
          </SearchField.Group>
        </SearchField>
        <ListBox>
          <ListBox.Item v-for="name in languages" :id="name.toLowerCase()" :key="name">
            {{ name }}
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Autocomplete.Filter>
    </Autocomplete.Popover>
  </Autocomplete>
</template>
