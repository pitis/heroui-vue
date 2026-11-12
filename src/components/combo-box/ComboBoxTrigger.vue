<script setup lang="ts">
import { useStrings } from '../../utils/strings'
import { ComboboxTrigger } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { IconChevronDown } from '../icons'
import { comboBoxKey } from './context'

const combo = inject(comboBoxKey)!
const strings = useStrings()
</script>

<template>
  <ComboboxTrigger as-child>
    <Bridge as="button" :aria-label="strings.showSuggestions" data-slot="combo-box-trigger" :class="combo.slots.trigger()" :data-open="combo.open || undefined">
      <slot>
        <IconChevronDown data-slot="combo-box-trigger-default-icon" />
      </slot>
    </Bridge>
  </ComboboxTrigger>
</template>
