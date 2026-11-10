<script setup lang="ts">
import { Button, Modal } from 'heroui-vue'
import { ref } from 'vue'

const examples = [
  { label: 'Default', variant: 'opaque', placement: 'auto', size: 'md' },
  { label: 'Blur, top', variant: 'blur', placement: 'top', size: 'sm' },
  { label: 'Transparent, large', variant: 'transparent', placement: 'center', size: 'lg' },
] as const
const controlled = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <Modal v-for="example in examples" :key="example.label">
      <Modal.Trigger as-child>
        <Button variant="secondary">
          {{ example.label }}
        </Button>
      </Modal.Trigger>
      <Modal.Backdrop :variant="example.variant">
        <Modal.Container :placement="example.placement" :size="example.size">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>{{ example.label }} modal</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              Focus is trapped inside. Press Escape or click outside to close.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="tertiary" @click="controlled = true">
                Open another
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>

    <Modal v-model:open="controlled">
      <Modal.Backdrop :is-dismissable="false">
        <Modal.Container size="sm">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Not dismissable</Modal.Heading>
            </Modal.Header>
            <Modal.Body>Outside clicks are ignored; use the button.</Modal.Body>
            <Modal.Footer>
              <Button @click="controlled = false">
                Done
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  </div>
</template>
