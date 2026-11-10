<script setup lang="ts">
import { DialogContent } from 'reka-ui'
import { computed, inject, provide } from 'vue'
import { surfaceKey } from '../surface/context'
import { modalKey, modalLayoutKey } from './context'

const { look } = inject(modalKey)!
const layout = inject(modalLayoutKey, undefined)
provide(surfaceKey, computed(() => 'default' as const))

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
       during the backdrop and container exit animations. No Description part in HeroUI: aria-describedby off. -->
  <DialogContent
    force-mount
    :role="look.prefix === 'alert-dialog' ? 'alertdialog' : 'dialog'"
    :aria-describedby="undefined"
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
