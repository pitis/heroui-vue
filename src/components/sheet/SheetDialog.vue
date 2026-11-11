<script setup lang="ts">
import { sheetVariants } from '@heroui/styles'
import { DialogContent } from 'reka-ui'
import { computed, inject, provide } from 'vue'
import { useDialogDescription } from '../../utils/dialog-description'
import { surfaceKey } from '../surface/context'
import { sheetKey } from './context'

const sheet = inject(sheetKey)!
provide(surfaceKey, computed(() => 'default' as const))
const described = useDialogDescription()

function preventIfNotDismissable(event: Event) {
  if (!sheet.isDismissable)
    event.preventDefault()
}
</script>

<template>
  <DialogContent
    force-mount
    v-bind="described"
    data-slot="sheet-dialog"
    :class="sheetVariants({ placement: sheet.placement }).dialog()"
    :data-placement="sheet.placement"
    style="flex: auto"
    @pointer-down-outside="preventIfNotDismissable"
    @interact-outside="preventIfNotDismissable"
    @escape-key-down="preventIfNotDismissable"
  >
    <slot />
  </DialogContent>
</template>
