<script setup lang="ts">
import { checkboxVariants } from '@heroui/styles'
import { CheckboxRoot } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { useControlAttrs } from '../../utils/control-attrs'
import { useField } from '../../utils/field'
import { checkboxKey } from './context'

// The clickable control + label. Reka's CheckboxRoot supplies role, keyboard handling and the hidden form input.
// A button, where React Aria renders a label: text-align: start undoes the browser's centred button text,
// which a label that wraps would otherwise show.
const checkbox = inject(checkboxKey)!
const field = useField()
const controlAttrs = useControlAttrs(() => field && `${field.value.descriptionId} ${field.value.errorId}`)
</script>

<template>
  <CheckboxRoot
    as-child
    :model-value="checkbox.isIndeterminate.value ? 'indeterminate' : checkbox.isSelected.value"
    :disabled="checkbox.isDisabled.value"
    :required="checkbox.isRequired.value"
    :name="checkbox.name.value"
    :value="checkbox.value.value"
    @update:model-value="checkbox.setSelected($event === true)"
  >
    <Bridge
      as="button"
      interactive
      data-slot="checkbox-content"
      :class="checkboxVariants().content()"
      style="text-align: start"
      :aria-invalid="field?.isInvalid || undefined"
      v-bind="controlAttrs()"
    >
      <slot />
    </Bridge>
  </CheckboxRoot>
</template>
