<script setup lang="ts">
import type { Placement } from '../../utils/placement'
import { SelectContent, SelectPortal } from 'reka-ui'
import { computed, inject, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { overlayStyle, sideAlign } from '../../utils/placement'
import { collectionKindKey } from '../list-box/context'
import { surfaceKey } from '../surface/context'
import { selectKey } from './context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{ placement?: Placement, offset?: number }>(), { placement: 'bottom', offset: 8 })

const select = inject(selectKey)!
const position = computed(() => sideAlign(props.placement))
provide(collectionKindKey, 'select')
provide(surfaceKey, computed(() => 'default' as const))
</script>

<template>
  <SelectPortal>
    <SelectContent as-child position="popper" :side="position.side" :align="position.align" :side-offset="offset">
      <Bridge
        overlay
        :data-slot="`${select.prefix}-popover`"
        :class="select.slots.popover()"
        :style="{ ...overlayStyle('select'), '--trigger-width': 'var(--reka-select-trigger-width)' }"
        v-bind="$attrs"
      >
        <slot />
      </Bridge>
    </SelectContent>
  </SelectPortal>
</template>
