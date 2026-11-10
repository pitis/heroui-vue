<script setup lang="ts">
import type { Placement } from '../../utils/placement'
import { ComboboxContent, ComboboxPortal } from 'reka-ui'
import { computed, inject, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { overlayStyle, sideAlign } from '../../utils/placement'
import { collectionKindKey } from '../list-box/context'
import { surfaceKey } from '../surface/context'
import { comboBoxKey } from './context'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{ placement?: Placement, offset?: number }>(), { placement: 'bottom', offset: 8 })

const combo = inject(comboBoxKey)!
const position = computed(() => sideAlign(props.placement))
provide(collectionKindKey, 'combobox')
provide(surfaceKey, computed(() => 'default' as const))
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent as-child position="popper" :side="position.side" :align="position.align" :side-offset="offset">
      <Bridge
        overlay
        data-slot="combo-box-popover"
        :class="combo.slots.popover()"
        :style="{ ...overlayStyle('combobox'), '--trigger-width': 'var(--reka-combobox-trigger-width)' }"
        v-bind="$attrs"
      >
        <slot />
      </Bridge>
    </ComboboxContent>
  </ComboboxPortal>
</template>
