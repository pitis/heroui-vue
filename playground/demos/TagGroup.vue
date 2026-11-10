<script setup lang="ts">
import { Description, Label, Tag, TagGroup } from 'heroui-vue'
import { ref } from 'vue'

const frameworks = ref(['Vue', 'Nuxt', 'Vite', 'Pinia'])
const selected = ref<string[]>(['news'])
const topics = ['news', 'travel', 'gaming', 'shopping']
</script>

<template>
  <div class="flex flex-col gap-6">
    <TagGroup @remove="keys => (frameworks = frameworks.filter(f => !keys.includes(f)))">
      <Label>Stack</Label>
      <TagGroup.List>
        <Tag v-for="name in frameworks" :id="name" :key="name">
          {{ name }}
        </Tag>
      </TagGroup.List>
      <Description>Remove with the × button, or focus a tag and press Delete.</Description>
    </TagGroup>

    <TagGroup v-model="selected" selection-mode="multiple" variant="surface" size="lg">
      <Label>Topics ({{ selected.join(', ') || 'none' }})</Label>
      <TagGroup.List>
        <Tag v-for="topic in topics" :id="topic" :key="topic" :is-disabled="topic === 'shopping'">
          {{ topic }}
        </Tag>
      </TagGroup.List>
    </TagGroup>
  </div>
</template>
