<script setup lang="ts">
import { sheetVariants } from '@heroui/styles'
import { computed, inject } from 'vue'
import { useDrawerDrag } from '../drawer/useDrawerDrag'
import { sheetKey } from './context'

const sheet = inject(sheetKey)!
// drags the whole Sheet.Content toward its edge; far or fast enough dismisses
const drag = useDrawerDrag(() => sheet.placement, () => sheet.isDismissable, sheet.close, computed(() => sheet.content), true)
</script>

<template>
  <div
    aria-hidden="true"
    data-sheet-handle=""
    data-slot="sheet-handle"
    :class="sheetVariants().handle()"
    @pointerdown="drag.onPointerdown"
    @pointermove="drag.onPointermove"
    @pointerup="drag.onPointerup"
    @pointercancel="drag.onPointercancel"
  >
    <slot>
      <span data-slot="sheet-handle-bar" :class="sheetVariants().handleBar()" />
    </slot>
  </div>
</template>
