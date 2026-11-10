<script setup lang="ts">
import { radioVariants } from '@heroui/styles'
import { RadioGroupItem } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { useField } from '../../utils/field'
import { radioKey } from './context'

// The clickable control + label: Reka's RadioGroupItem (role=radio, roving focus).
const radio = inject(radioKey)!
const field = useField()
</script>

<template>
  <RadioGroupItem as-child :value="radio.value" :disabled="radio.isDisabled.value">
    <Bridge
      as="button"
      interactive
      data-slot="radio-content"
      :class="radioVariants().content()"
      :aria-describedby="field && `${field.descriptionId} ${field.errorId}`"
    >
      <slot :is-selected="radio.isSelected.value" />
    </Bridge>
  </RadioGroupItem>
</template>
