<script setup lang="ts">
import { Alert, Button } from 'heroui-vue'

const statuses = ['default', 'accent', 'success', 'warning', 'danger'] as const
</script>

<template>
  <div class="flex max-w-xl flex-col gap-3">
    <Alert v-for="status in statuses" :key="status" :status="status">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{{ status }} alert</Alert.Title>
        <Alert.Description>Your changes were saved to the cloud.</Alert.Description>
      </Alert.Content>
      <Button v-if="status === 'danger'" size="sm" variant="danger">
        Retry
      </Button>
    </Alert>
  </div>
</template>
