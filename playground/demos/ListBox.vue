<script setup lang="ts">
import { Description, Header, Label, ListBox } from 'heroui-vue'
import { ref } from 'vue'

const single = ref('inbox')
const multiple = ref<string[]>(['vue'])
</script>

<template>
  <div class="flex flex-wrap gap-8">
    <div class="flex w-64 flex-col gap-2">
      <ListBox v-model="single" aria-label="Folders" class="rounded-2xl bg-overlay p-1.5">
        <ListBox.Item id="inbox">
          Inbox
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="drafts" text-value="Drafts">
          <div class="flex flex-col">
            <Label>Drafts</Label>
            <Description>3 unsent</Description>
          </div>
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="spam" is-disabled>
          Spam
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Item id="trash" variant="danger">
          Trash
          <ListBox.ItemIndicator />
        </ListBox.Item>
      </ListBox>
      <span class="text-sm text-muted">Selected: {{ single }}</span>
    </div>
    <div class="flex w-64 flex-col gap-2">
      <ListBox v-model="multiple" selection-mode="multiple" aria-label="Frameworks" class="rounded-2xl bg-overlay p-1.5">
        <ListBox.Section>
          <Header>Frontend</Header>
          <ListBox.Item v-for="name in ['vue', 'react', 'svelte']" :id="name" :key="name">
            {{ name }}
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox.Section>
        <ListBox.Section>
          <Header>Backend</Header>
          <ListBox.Item v-for="name in ['node', 'go']" :id="name" :key="name">
            {{ name }}
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox.Section>
      </ListBox>
      <span class="text-sm text-muted">Selected: {{ multiple.join(', ') }}</span>
    </div>
  </div>
</template>
