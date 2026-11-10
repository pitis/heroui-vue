<script setup lang="ts">
import { ComboboxAnchor } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { comboBoxKey } from './context'

// The Input and Trigger; the popover is positioned against (and as wide as) this group.
const combo = inject(comboBoxKey)!
</script>

<template>
  <ComboboxAnchor as-child>
    <Bridge data-slot="combo-box-input-group" :class="combo.slots.inputGroup()">
      <slot />
    </Bridge>
  </ComboboxAnchor>
</template>
