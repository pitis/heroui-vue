<script setup lang="ts">
import { ComboboxTrigger } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { IconChevronDown } from '../icons'
import { comboBoxKey } from './context'

const combo = inject(comboBoxKey)!
</script>

<template>
  <ComboboxTrigger as-child>
    <Bridge as="button" aria-label="Show suggestions" data-slot="combo-box-trigger" :class="combo.slots.trigger()" :data-open="combo.open || undefined">
      <slot>
        <IconChevronDown data-slot="combo-box-trigger-default-icon" />
      </slot>
    </Bridge>
  </ComboboxTrigger>
</template>
