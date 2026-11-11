<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { drawerVariants } from '@heroui/styles'
import { DialogContent } from 'reka-ui'
import { computed, inject, provide, useTemplateRef } from 'vue'
import { useDialogDescription } from '../../utils/dialog-description'
import { surfaceKey } from '../surface/context'
import { drawerKey, drawerLayoutKey } from './context'
import { useDrawerDrag } from './useDrawerDrag'

const drawer = inject(drawerKey)!
const layout = inject(drawerLayoutKey, undefined)
provide(surfaceKey, computed(() => 'default' as const))
const described = useDialogDescription()

const isDismissable = computed(() => layout?.value.isDismissable !== false)
const dialog = useTemplateRef<ComponentPublicInstance>('dialog')
const drag = useDrawerDrag(
  () => layout?.value.placement,
  () => isDismissable.value,
  () => (drawer.open.value = false),
  computed(() => dialog.value?.$el as HTMLElement | undefined),
)

function onPointerDownOutside(event: Event) {
  if (!isDismissable.value)
    event.preventDefault()
}
</script>

<template>
  <!-- force-mount: the backdrop's exit hold decides when everything unmounts -->
  <DialogContent
    ref="dialog"
    force-mount
    v-bind="described"
    data-slot="drawer-dialog"
    :class="drawerVariants({ placement: layout?.placement }).dialog()"
    :data-placement="layout?.placement"
    :style="isDismissable ? { touchAction: 'none' } : undefined"
    @pointer-down-outside="onPointerDownOutside"
    @interact-outside="onPointerDownOutside"
    @pointerdown="drag.onPointerdown"
    @pointermove="drag.onPointermove"
    @pointerup="drag.onPointerup"
    @pointercancel="drag.onPointercancel"
    @lostpointercapture="$event.target === $event.currentTarget && drag.onPointercancel()"
  >
    <slot />
  </DialogContent>
</template>
