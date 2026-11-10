<script setup lang="ts">
import type { SelectionMode } from './context'
import { menuVariants } from '@heroui/styles'
import { DropdownMenuRadioGroup } from 'reka-ui'
import { computed, inject, provide, reactive, toRef } from 'vue'
import { Bridge } from '../../utils/bridge'
import { inDropdownKey, menuKey } from './context'

const props = withDefaults(defineProps<{
  selectionMode?: SelectionMode
  /** Dropdown.Menu passes its own class and data-slot. */
  look?: { class: string, slot: string }
}>(), { selectionMode: 'none' })

const emit = defineEmits<{
  /** An item was chosen (in every selection mode). */
  action: [id: string]
}>()

/** Selected item `id` (single) or ids (multiple). */
const model = defineModel<string | string[]>()

const kind = inject(inDropdownKey, false) ? 'dropdown' : 'standalone'
const selected = computed(() => (model.value == null ? [] : Array.isArray(model.value) ? model.value : [model.value]))

provide(menuKey, reactive({
  kind,
  selectionMode: toRef(props, 'selectionMode'),
  isSelected: (id: string) => selected.value.includes(id),
  toggle(id: string) {
    if (props.selectionMode === 'single')
      model.value = id
    else if (props.selectionMode === 'multiple')
      model.value = selected.value.includes(id) ? selected.value.filter(key => key !== id) : [...selected.value, id]
  },
  action: (id: string) => emit('action', id),
}))

const cls = computed(() => props.look?.class ?? menuVariants())
const slot = computed(() => props.look?.slot ?? 'menu')

// standalone menus get arrow-key navigation between items; in a dropdown Reka does this
function onKeydown(event: KeyboardEvent) {
  if (kind === 'dropdown' || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key))
    return
  const items = [...(event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role^="menuitem"]:not([aria-disabled="true"])')]
  const index = items.indexOf(document.activeElement as HTMLElement)
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : Math.min(items.length - 1, Math.max(0, index + (event.key === 'ArrowDown' ? 1 : -1)))
  event.preventDefault()
  items[next]?.focus()
}
</script>

<template>
  <!-- single selection in a dropdown: Reka's radio group owns which radio item is checked -->
  <DropdownMenuRadioGroup
    v-if="kind === 'dropdown' && selectionMode === 'single'"
    as-child
    :model-value="selected[0]"
    @update:model-value="id => id != null && (model = id as string)"
  >
    <Bridge :data-slot="slot" :class="cls" data-selection-mode="single">
      <slot />
    </Bridge>
  </DropdownMenuRadioGroup>
  <div
    v-else
    :role="kind === 'standalone' ? 'menu' : undefined"
    :data-slot="slot"
    :class="cls"
    :data-selection-mode="selectionMode === 'none' ? undefined : selectionMode"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
