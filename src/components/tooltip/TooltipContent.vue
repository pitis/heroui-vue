<script setup lang="ts">
import type { Placement } from '../../utils/placement'
import { tooltipVariants } from '@heroui/styles'
import { TooltipContent as RekaTooltipContent, TooltipPortal } from 'reka-ui'
import { computed } from 'vue'
import { Bridge } from '../../utils/bridge'
import { overlayStyle, sideAlign, useArrowOffset } from '../../utils/placement'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  placement?: Placement
  /** Gap to the trigger in px; the default leaves room for a Tooltip.Arrow when there is one. */
  offset?: number
  /** Kept for HeroUI compatibility: a Tooltip.Arrow inside is detected automatically. */
  showArrow?: boolean
}>(), { placement: 'top' })

const position = computed(() => sideAlign(props.placement))
const sideOffset = useArrowOffset(hasArrow => props.offset ?? (hasArrow || props.showArrow ? 7 : 3))
</script>

<template>
  <TooltipPortal>
    <RekaTooltipContent as-child :side="position.side" :align="position.align" :side-offset="sideOffset">
      <Bridge overlay data-slot="tooltip" :class="tooltipVariants().base()" :style="overlayStyle('tooltip')" v-bind="$attrs">
        <slot />
      </Bridge>
    </RekaTooltipContent>
  </TooltipPortal>
</template>
