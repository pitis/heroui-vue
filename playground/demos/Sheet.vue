<script setup lang="ts">
import { Button, Sheet } from 'heroui-vue'
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <Sheet v-for="placement in (['bottom', 'right'] as const)" :key="placement" :placement="placement">
      <Sheet.Trigger>
        <Button variant="secondary">
          {{ placement }} sheet
        </Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle v-if="placement === 'bottom'" />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Share</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p v-for="n in 4" :key="n" class="py-2">
                Option {{ n }}
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button>Done</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
    <Sheet is-detached>
      <Sheet.Trigger>
        <Button variant="tertiary">
          Detached
        </Button>
      </Sheet.Trigger>
      <Sheet.Backdrop variant="blur">
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Detached sheet</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>Floats above the edge with rounded corners.</Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  </div>
</template>
