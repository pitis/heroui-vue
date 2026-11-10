<script setup lang="ts">
import type { DrawerVariants } from '@heroui/styles'
import { drawerVariants } from '@heroui/styles'
import { DialogOverlay, DialogPortal } from 'reka-ui'
import { computed, inject, provide, shallowRef } from 'vue'
import { Bridge } from '../../utils/bridge'
import { useExitHold } from '../../utils/exit-hold'
import { drawerKey, drawerLayoutKey } from './context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  variant?: DrawerVariants['variant']
  /** Close on outside click and allow drag-to-dismiss. */
  isDismissable?: boolean
}>(), { isDismissable: true })

const drawer = inject(drawerKey)!
provide(drawerLayoutKey, computed(() => ({ isDismissable: props.isDismissable })))

// the drawer slides out with a transition, which Reka's presence doesn't wait for
// (a vnode hook, not a template ref: Reka's as-child slot drops refs placed on its child)
const backdrop = shallowRef<Element | null>(null)
const present = useExitHold(drawer.open, () => backdrop.value)
</script>

<template>
  <DialogPortal>
    <DialogOverlay v-if="present" force-mount as-child>
      <Bridge overlay @vue:mounted="backdrop = $event.el as Element" @vue:unmounted="backdrop = null" data-slot="drawer-backdrop" :class="drawerVariants({ variant }).backdrop()" v-bind="$attrs">
        <slot />
      </Bridge>
    </DialogOverlay>
  </DialogPortal>
</template>
