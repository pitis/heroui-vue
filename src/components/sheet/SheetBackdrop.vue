<script setup lang="ts">
import type { SheetVariants } from '@heroui/styles'
import { sheetVariants } from '@heroui/styles'
import { DialogOverlay, DialogPortal } from 'reka-ui'
import { computed, inject, shallowRef, toRef } from 'vue'
import { useExitHold } from '../../utils/exit-hold'
import { sheetKey } from './context'

defineOptions({ inheritAttrs: false })

defineProps<{ variant?: SheetVariants['backdrop'] }>()

const sheet = inject(sheetKey)!
const overlay = shallowRef<Element | null>(null)
// stays mounted until the slide-out (Web Animations on Sheet.Content) and the fade-out finish
const present = useExitHold(toRef(sheet, 'open'), () => overlay.value)

const vertical = computed(() => sheet.placement === 'top' || sheet.placement === 'bottom')
// React Aria's Sheet lays the overlay out itself; @heroui/styles only styles the surfaces
const layout = computed(() => ({
  position: 'fixed' as const,
  inset: '0',
  display: 'flex',
  flexDirection: vertical.value ? 'column' as const : 'row' as const,
  justifyContent: sheet.placement === 'bottom' || sheet.placement === 'right' ? 'flex-end' : 'flex-start',
  alignItems: 'center',
}))
const fade = computed(() => (sheet.open ? 'heroui-sheet-backdrop 300ms ease-out' : 'heroui-sheet-backdrop 200ms ease-in reverse forwards'))
</script>

<template>
  <DialogPortal>
    <DialogOverlay v-if="present" force-mount as-child>
      <div
        data-slot="sheet-overlay"
        :class="sheetVariants().overlay()"
        :data-closed="!sheet.open || undefined"
        :style="layout"
        v-bind="$attrs"
        @vue:mounted="overlay = $event.el as Element"
        @vue:unmounted="overlay = null"
      >
        <!-- data-stack-index 0: the bottom of the (single-level) sheet stack gets the backdrop color -->
        <div
          aria-hidden="true"
          data-slot="sheet-backdrop"
          data-stack-index="0"
          :class="sheetVariants({ backdrop: variant }).backdrop()"
          :style="{ position: 'absolute', inset: '0', animation: fade }"
        />
        <slot />
      </div>
    </DialogOverlay>
  </DialogPortal>
</template>
