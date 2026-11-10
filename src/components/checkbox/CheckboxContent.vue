<script setup lang="ts">
import { checkboxVariants } from '@heroui/styles'
import { CheckboxRoot } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { useField } from '../../utils/field'
import { checkboxKey } from './context'

// The clickable control + label. Reka's CheckboxRoot supplies role, keyboard handling and the hidden form input.
const checkbox = inject(checkboxKey)!
const field = useField()
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
      :aria-describedby="field && `${field.descriptionId} ${field.errorId}`"
      :aria-invalid="field?.isInvalid || undefined"
    >
      <slot />
    </Bridge>
  </CheckboxRoot>
</template>
