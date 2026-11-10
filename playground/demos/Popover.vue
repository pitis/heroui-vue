<script setup lang="ts">
import { Button, Popover } from 'heroui-vue'
</script>

<template>
  <div class="flex gap-3">
    <Popover v-for="placement in (['bottom', 'top', 'right'] as const)" :key="placement">
      <Popover.Trigger as-child>
        <Button variant="secondary">
          Open {{ placement }}
        </Button>
      </Popover.Trigger>
      <Popover.Content :placement="placement" class="max-w-64">
        <Popover.Dialog>
          <Popover.Arrow />
          <Popover.Heading>Popover on {{ placement }}</Popover.Heading>
          <p>Positioned by Reka UI, styled by @heroui/styles.</p>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  </div>
</template>
