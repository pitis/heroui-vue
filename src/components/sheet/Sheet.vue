<script setup lang="ts">
import type { SheetPlacement } from './context'
import { DialogRoot } from 'reka-ui'
import { provide, reactive, shallowRef, toRef } from 'vue'
import { sheetKey } from './context'

// renders no element of its own
defineOptions({ inheritAttrs: false })

// shortcut: no snap points and no nested-sheet stacking (Sheet.NestedRoot is a plain Sheet);
// both need React Aria's scroll-snapping Sheet, which has no Reka counterpart
const props = withDefaults(defineProps<{
  placement?: SheetPlacement
  /** Floats with a margin and rounded corners on every side. */
  isDetached?: boolean
  /** Close on outside click, Escape, and drag. */
  isDismissable?: boolean
}>(), { placement: 'bottom', isDismissable: true })

const open = defineModel<boolean>('open', { default: false })

provide(sheetKey, reactive({
  open,
  placement: toRef(props, 'placement'),
  isDetached: toRef(props, 'isDetached'),
  isDismissable: toRef(props, 'isDismissable'),
  content: shallowRef<HTMLElement | null>(null),
  close: () => (open.value = false),
}))
</script>

<template>
  <DialogRoot v-model:open="open">
    <slot :open="open" :close="() => (open = false)" />
  </DialogRoot>
</template>
