<script setup lang="ts">
import type { MenuItemVariants } from '@heroui/styles'
import { menuItemVariants } from '@heroui/styles'
import { DropdownMenuCheckboxItem, DropdownMenuItem, DropdownMenuRadioItem, DropdownMenuSubTrigger } from 'reka-ui'
import { computed, inject, provide, useSlots } from 'vue'
import { Bridge } from '../../utils/bridge'
import { DISABLED_ITEM_STYLE } from '../list-box/context'
import { menuItemKey, menuKey, submenuKey } from '../menu/context'

const props = defineProps<{
  id: string
  /** Text for typeahead; defaults to the item's text. */
  textValue?: string
  isDisabled?: boolean
  variant?: MenuItemVariants['variant']
}>()

const menu = inject(menuKey)!
// the item placed directly inside Dropdown.SubmenuTrigger opens the submenu
const submenu = inject(submenuKey, null)
const isSubTrigger = submenu != null && !submenu.claimed
if (submenu)
  submenu.claimed = true
provide(menuItemKey, { id: props.id, hasSubmenu: isSubTrigger })

const slots = useSlots()
const text = computed(() => props.textValue ?? slots.default?.().map(node => (typeof node.children === 'string' ? node.children : '')).join('').trim())
const selected = computed(() => menu.isSelected(props.id))

const component = computed(() => {
  if (isSubTrigger)
    return DropdownMenuSubTrigger
  return { none: DropdownMenuItem, single: DropdownMenuRadioItem, multiple: DropdownMenuCheckboxItem }[menu.selectionMode]
})
const itemProps = computed(() => (menu.selectionMode === 'single' && !isSubTrigger
  ? { value: props.id }
  : menu.selectionMode === 'multiple' && !isSubTrigger ? { modelValue: selected.value } : {}))

function onSelect(event: Event) {
  if (menu.selectionMode === 'multiple') {
    event.preventDefault() // keep the menu open while toggling several
    menu.toggle(props.id)
  }
  menu.action(props.id)
}

const role = computed(() => ({ none: 'menuitem', single: 'menuitemradio', multiple: 'menuitemcheckbox' })[menu.selectionMode])
function activate() {
  if (props.isDisabled)
    return
  menu.toggle(props.id)
  menu.action(props.id)
}
</script>

<template>
  <component
    :is="component"
    v-if="menu.kind === 'dropdown'"
    as-child
    v-bind="itemProps"
    :text-value="text"
    :disabled="isDisabled"
    @select="onSelect"
  >
    <Bridge
      :highlight="false"
      data-slot="menu-item"
      :class="menuItemVariants({ variant }).item()"
      :data-selection-mode="menu.selectionMode === 'none' ? undefined : menu.selectionMode"
      :data-has-submenu="isSubTrigger || undefined"
      :style="isDisabled ? DISABLED_ITEM_STYLE : undefined"
    >
      <slot :is-selected="selected" />
    </Bridge>
  </component>
  <!-- standalone menu: plain menu items; the Menu moves focus between them with the arrow keys -->
  <!-- shortcut: every item is in the Tab order (no roving tabindex) -->
  <div
    v-else
    :role="role"
    :tabindex="isDisabled ? -1 : 0"
    data-slot="menu-item"
    :class="menuItemVariants({ variant }).item()"
    :aria-checked="menu.selectionMode === 'none' ? undefined : selected"
    :aria-disabled="isDisabled || undefined"
    :data-disabled="isDisabled || undefined"
    :data-selection-mode="menu.selectionMode === 'none' ? undefined : menu.selectionMode"
    @click="activate"
    @keydown.enter.space.prevent="activate"
  >
    <slot :is-selected="selected" />
  </div>
</template>
