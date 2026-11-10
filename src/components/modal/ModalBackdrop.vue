<script setup lang="ts">
import type { ModalVariants } from '@heroui/styles'
import { DialogOverlay, DialogPortal } from 'reka-ui'
import { computed, inject, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { modalKey, modalLayoutKey } from './context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  variant?: ModalVariants['variant']
  /** Close when clicking outside the dialog. Default: true for Modal, false for AlertDialog. */
  isDismissable?: boolean
  /** Ignore Escape. Default: false for Modal, true for AlertDialog. */
  isKeyboardDismissDisabled?: boolean
}>(), { isDismissable: undefined, isKeyboardDismissDisabled: undefined })

const { look } = inject(modalKey)!
const isAlert = look.prefix === 'alert-dialog'
provide(modalLayoutKey, computed(() => ({
  isDismissable: props.isDismissable ?? !isAlert,
  isKeyboardDismissDisabled: props.isKeyboardDismissDisabled ?? isAlert,
})))
</script>

<template>
  <!-- Reka's overlay locks page scroll and stays mounted until its exit animation (data-exiting) ends -->
  <DialogPortal>
    <DialogOverlay as-child>
      <Bridge overlay :data-slot="`${look.prefix}-backdrop`" :class="look.variants({ variant }).backdrop()" v-bind="$attrs">
        <slot />
      </Bridge>
    </DialogOverlay>
  </DialogPortal>
</template>
