<script setup lang="ts">
import { Button, Card, Separator, Surface } from 'heroui-vue'
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Card v-for="variant in (['default', 'secondary', 'tertiary'] as const)" :key="variant" :variant="variant" class="w-64">
      <Card.Header>
        <Card.Title>{{ variant }} card</Card.Title>
        <Card.Description>Built from style-only parts.</Card.Description>
      </Card.Header>
      <Card.Content>Content goes here.</Card.Content>
      <Separator />
      <Card.Footer>
        <Button size="sm">
          Action
        </Button>
      </Card.Footer>
    </Card>
    <Surface variant="secondary" class="rounded-2xl p-4">
      A surface
    </Surface>
  </div>
</template>
