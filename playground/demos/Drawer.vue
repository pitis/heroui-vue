<script setup lang="ts">
import { Button, Drawer } from 'heroui-vue'
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <Drawer v-for="placement in (['bottom', 'top', 'left', 'right'] as const)" :key="placement">
      <template #default="{ close }">
        <Drawer.Trigger as-child>
          <Button variant="secondary">
            {{ placement }}
          </Button>
        </Drawer.Trigger>
        <Drawer.Backdrop>
          <Drawer.Content :placement="placement">
            <Drawer.Dialog>
              <Drawer.Handle v-if="placement === 'bottom' || placement === 'top'" />
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>{{ placement }} drawer</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <p>Drag the drawer toward its edge, press Escape or click outside to dismiss.</p>
              </Drawer.Body>
              <Drawer.Footer>
                <Button @click="close">
                  Done
                </Button>
              </Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </template>
    </Drawer>
  </div>
</template>
