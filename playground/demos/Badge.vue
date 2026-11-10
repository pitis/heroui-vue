<script setup lang="ts">
import { Badge, Button } from 'heroui-vue'

const colors = ['default', 'accent', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Badge.Anchor v-for="(color, i) in colors" :key="color">
      <Button variant="tertiary">
        {{ color }}
      </Button>
      <Badge :color="color" :variant="i % 2 ? 'soft' : 'primary'">
        {{ i + 1 }}
      </Badge>
    </Badge.Anchor>
    <Badge.Anchor>
      <Button variant="secondary">
        Inbox
      </Button>
      <Badge color="danger" placement="bottom-right" size="lg">
        99+
      </Badge>
    </Badge.Anchor>
  </div>
</template>
