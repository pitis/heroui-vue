<script setup lang="ts">
import { toolbarVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { separatorOrientationKey } from '../separator/context'
import { toolbarOrientationKey } from '../toggle-button-group/context'

const props = withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
  /** Joined look: no gaps, shared background. */
  isAttached?: boolean
}>(), { orientation: 'horizontal' })

provide(toolbarOrientationKey, computed(() => props.orientation))
provide(separatorOrientationKey, () => (props.orientation === 'horizontal' ? 'vertical' : 'horizontal'))

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Arrow keys move between the toolbar's controls, as React Aria's Toolbar does (no wrap-around).
// shortcut: every control stays in the Tab order; React Aria tabs out of the toolbar in one step
function onKeydown(event: KeyboardEvent) {
  const [prev, next] = props.orientation === 'horizontal' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown']
  if (![prev, next, 'Home', 'End'].includes(event.key))
    return
  const items = [...(event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(FOCUSABLE)].filter(el => el.offsetParent !== null || el === document.activeElement)
  const index = items.indexOf(document.activeElement as HTMLElement)
  const target = event.key === 'Home' ? items[0] : event.key === 'End' ? items.at(-1) : items[index + (event.key === next ? 1 : -1)]
  if (target && index !== -1) {
    event.preventDefault()
    target.focus()
  }
}
</script>

<template>
  <div
    role="toolbar"
    data-slot="toolbar"
    :class="toolbarVariants({ isAttached, orientation })"
    :aria-orientation="orientation"
    :data-orientation="orientation"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
