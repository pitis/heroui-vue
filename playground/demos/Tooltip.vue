<script setup lang="ts">
import { Button, Tooltip } from 'heroui-vue'
</script>

<template>
  <div class="flex flex-wrap gap-3 py-8">
    <Tooltip v-for="placement in (['top', 'bottom', 'left', 'right'] as const)" :key="placement" :delay="200">
      <Tooltip.Trigger as-child>
        <Button variant="secondary">
          {{ placement }}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content :placement="placement" show-arrow>
        <Tooltip.Arrow />
        Tooltip on {{ placement }}
      </Tooltip.Content>
    </Tooltip>
    <Tooltip>
      <Tooltip.Trigger>Plain trigger (theme delay)</Tooltip.Trigger>
      <Tooltip.Content>No arrow</Tooltip.Content>
    </Tooltip>
  </div>
</template>
