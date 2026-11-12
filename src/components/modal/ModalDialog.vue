<script setup lang="ts">
import { DialogContent } from 'reka-ui'
import { computed, inject, provide } from 'vue'
import { useDialogDescription } from '../../utils/dialog-description'
import { surfaceKey } from '../surface/context'
import { modalKey, modalLayoutKey } from './context'

const { look } = inject(modalKey)!
const layout = inject(modalLayoutKey, undefined)
provide(surfaceKey, computed(() => 'default' as const))
const described = useDialogDescription()

function onPointerDownOutside(event: Event) {
  if (layout?.value.isDismissable === false)
    event.preventDefault()
}
function onEscapeKeyDown(event: KeyboardEvent) {
  if (layout?.value.isKeyboardDismissDisabled)
    event.preventDefault()
}
</script>

<template>
  <!-- force-mount: the backdrop's presence decides when everything unmounts, so the dialog stays visible
       during the backdrop and container exit animations. -->
  <DialogContent
    force-mount
    :role="look.prefix === 'alert-dialog' ? 'alertdialog' : 'dialog'"
    v-bind="described"
    :data-slot="`${look.prefix}-dialog`"
    :class="look.variants({ scroll: layout?.scroll, size: layout?.size }).dialog()"
    :data-placement="layout?.placement"
    @pointer-down-outside="onPointerDownOutside"
    @interact-outside="onPointerDownOutside"
    @escape-key-down="onEscapeKeyDown"
  >
    <slot />
  </DialogContent>
</template>
