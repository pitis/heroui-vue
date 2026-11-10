<script setup lang="ts">
import type { InputVariants } from '@heroui/styles'
import { inputVariants } from '@heroui/styles'
import { ComboboxInput } from 'reka-ui'
import { inject, shallowRef, watch } from 'vue'
import { fieldControlAttrs, useField } from '../../utils/field'
import { comboboxInputKey, inputVariantKey } from './context'

defineProps<{ variant?: InputVariants['variant'], fullWidth?: boolean }>()

/** The text; inside a ComboBox, the search text typed so far. */
const model = defineModel<string>()

// inside a field (TextField…): ids, described-by and disabled/invalid/required come from it
const field = useField()
const inheritedVariant = inject(inputVariantKey, undefined)
const combobox = inject(comboboxInputKey, undefined)

// Reka computes the text once, before the items have told us their labels: follow the selected item's text
// while the user isn't typing
// (a vnode hook, not a template ref: Reka's as-child slot drops refs on its child)
const comboInput = shallowRef<Element | null>(null)
if (combobox) {
  watch(combobox.selectedText, (text) => {
    if (text != null && document.activeElement !== comboInput.value)
      model.value = text
  })
}
</script>

<template>
  <!-- inside a ComboBox, Reka's ComboboxInput owns value, keyboard handling and the combobox ARIA -->
  <ComboboxInput v-if="combobox" v-model="model" as-child :display-value="combobox.displayValue">
    <input
      @vue:mounted="comboInput = $event.el as Element"
      data-slot="input"
      :class="inputVariants({ fullWidth, variant: variant ?? inheritedVariant })"
      v-bind="fieldControlAttrs(field)"
      :disabled="field?.isDisabled"
      :readonly="field?.isReadOnly"
      :required="field?.isRequired"
      :data-invalid="field?.isInvalid || undefined"
    >
  </ComboboxInput>
  <input
    v-else
    v-model="model"
    data-slot="input"
    :class="inputVariants({ fullWidth, variant: variant ?? inheritedVariant })"
    v-bind="fieldControlAttrs(field)"
    :disabled="field?.isDisabled"
    :readonly="field?.isReadOnly"
    :required="field?.isRequired"
    :data-invalid="field?.isInvalid || undefined"
  >
</template>
