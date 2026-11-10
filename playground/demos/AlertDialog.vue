<script setup lang="ts">
import { AlertDialog, Button } from 'heroui-vue'
import { ref } from 'vue'

const deleted = ref(false)
</script>

<template>
  <div class="flex items-center gap-4">
    <AlertDialog>
      <template #default="{ close }">
        <AlertDialog.Trigger as-child>
          <Button variant="danger">
            Delete project
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Backdrop>
          <AlertDialog.Container size="sm">
            <AlertDialog.Dialog>
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete this project?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                All files will be removed. This cannot be undone.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button variant="tertiary" @click="close">
                  Cancel
                </Button>
                <Button variant="danger" @click="deleted = true; close()">
                  Delete
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </template>
    </AlertDialog>
    <span class="text-sm text-muted">{{ deleted ? 'Deleted.' : 'Not deleted.' }}</span>
  </div>
</template>
