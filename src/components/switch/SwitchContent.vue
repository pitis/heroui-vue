<script setup lang="ts">
import { switchVariants } from '@heroui/styles'
import { SwitchRoot } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { useField } from '../../utils/field'
import { switchKey } from './context'

// The clickable control + label. Reka's SwitchRoot supplies role=switch, keyboard handling and the hidden form input.
const sw = inject(switchKey)!
const field = useField()
</script>

<template>
  <SwitchRoot
    as-child
    :model-value="sw.isSelected.value"
    :disabled="sw.isDisabled.value"
    :required="sw.isRequired.value"
    :name="sw.name.value"
    :value="sw.value.value"
    @update:model-value="sw.setSelected($event)"
  >
    <Bridge
      as="button"
      interactive
      data-slot="switch-content"
      :class="switchVariants().content()"
      :aria-describedby="field && `${field.descriptionId} ${field.errorId}`"
      :aria-invalid="field?.isInvalid || undefined"
    >
      <slot />
    </Bridge>
  </SwitchRoot>
</template>
