<script setup lang="ts">
import type { Placement } from '../../utils/placement'
import { dropdownVariants } from '@heroui/styles'
import { DropdownMenuContent, DropdownMenuPortal, DropdownMenuSubContent } from 'reka-ui'
import { computed, inject, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { overlayStyle, sideAlign } from '../../utils/placement'
import { inDropdownKey, submenuKey } from '../menu/context'
import { surfaceKey } from '../surface/context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{ placement?: Placement, offset?: number }>(), { offset: 8 })

// inside Dropdown.SubmenuTrigger this is the submenu
const isSubmenu = inject(submenuKey, null) != null
provide(submenuKey, null)
provide(inDropdownKey, true)
provide(surfaceKey, computed(() => 'default' as const))
const position = computed(() => sideAlign(props.placement ?? (isSubmenu ? 'right top' : 'bottom start')))
</script>

<template>
  <DropdownMenuPortal>
    <component
      :is="isSubmenu ? DropdownMenuSubContent : DropdownMenuContent"
      as-child
      v-bind="isSubmenu ? { sideOffset: offset } : { side: position.side, align: position.align, sideOffset: offset }"
    >
      <Bridge overlay data-slot="dropdown-popover" :class="dropdownVariants().popover()" :style="overlayStyle('dropdown-menu')" v-bind="$attrs">
        <slot />
      </Bridge>
    </component>
  </DropdownMenuPortal>
</template>
