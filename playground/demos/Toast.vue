<script setup lang="ts">
import { Button, toast, Toast } from 'heroui-vue'
import { ref } from 'vue'

const placement = ref<'bottom' | 'top end'>('bottom')
const wait = (ms: number, fail = false) => new Promise((resolve, reject) => setTimeout(fail ? reject : resolve, ms))
let count = 0
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <Button variant="secondary" @click="toast(`Event ${++count} created`, { description: 'Monday, 10:00' })">
      Default
    </Button>
    <Button variant="secondary" @click="toast.success('Changes saved')">
      Success
    </Button>
    <Button variant="secondary" @click="toast.info('New version available', { actionProps: { children: 'Reload', size: 'sm', onClick: () => toast.clear() } })">
      Info + action
    </Button>
    <Button variant="secondary" @click="toast.warning('Storage almost full', { timeout: 0 })">
      Warning (sticky)
    </Button>
    <Button variant="secondary" @click="toast.danger('Upload failed', { description: 'Check your connection.' })">
      Danger
    </Button>
    <Button variant="secondary" @click="toast.promise(wait(1500), { loading: 'Uploading…', success: 'Uploaded', error: 'Failed' })">
      Promise
    </Button>
    <Button variant="tertiary" @click="placement = placement === 'bottom' ? 'top end' : 'bottom'">
      Placement: {{ placement }}
    </Button>
  </div>
  <Toast.Provider :placement="placement" />
</template>
