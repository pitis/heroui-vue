<script setup lang="ts">
import type { Placement } from '../../utils/placement'
import { popoverVariants } from '@heroui/styles'
import { PopoverContent as RekaPopoverContent, PopoverPortal } from 'reka-ui'
import { computed, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { overlayStyle, sideAlign, useArrowOffset } from '../../utils/placement'
import { surfaceKey } from '../surface/context'

// the root is a portal, so attrs (class, style…) are forwarded to the popover element by hand
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  placement?: Placement
  /** Gap between trigger and popover, in px. */
  offset?: number
}>(), { placement: 'bottom', offset: 8 })

const position = computed(() => sideAlign(props.placement))
const sideOffset = useArrowOffset(() => props.offset)

provide(surfaceKey, computed(() => 'default' as const))
</script>

<template>
  <PopoverPortal>
    <RekaPopoverContent as-child :side="position.side" :align="position.align" :side-offset="sideOffset">
      <!-- `overlay`: adds data-entering / data-exiting, which drive the enter/exit animations -->
      <Bridge
        overlay
        data-slot="popover"
        :class="popoverVariants().base()"
        :style="overlayStyle('popover')"
        v-bind="$attrs"
      >
        <slot />
      </Bridge>
    </RekaPopoverContent>
  </PopoverPortal>
</template>
