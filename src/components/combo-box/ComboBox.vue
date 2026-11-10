<script setup lang="ts">
import type { InputVariants } from '@heroui/styles'
import { comboBoxVariants } from '@heroui/styles'
import { ComboboxRoot } from 'reka-ui'
import { computed, provide, reactive, toRef } from 'vue'
import { Bridge } from '../../utils/bridge'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { comboboxInputKey, inputVariantKey } from '../input/context'
import { itemTextKey } from '../list-box/context'
import { comboBoxKey } from './context'

const props = withDefaults(defineProps<{
  /** Inherited by the Input inside. */
  variant?: InputVariants['variant']
  fullWidth?: boolean
  /** When the list opens: on focus, on typing only, or only from the trigger button. */
  menuTrigger?: 'focus' | 'input' | 'manual'
  name?: string
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
}>(), { menuTrigger: 'focus' })

/** Selected item `id`. The text typed is the Input's own v-model. */
const model = defineModel<string>()
const open = defineModel<boolean>('open', { default: false })

provideField(props)
provide(inputVariantKey, computed(() => props.variant))
// items register their text, so the input can show the selected item's text instead of its id
const texts = reactive(new Map<string, string>())
provide(itemTextKey, texts)
provide(comboboxInputKey, {
  displayValue: value => (value == null ? '' : texts.get(String(value)) ?? String(value)),
  selectedText: computed(() => (model.value == null ? undefined : texts.get(model.value))),
})
provide(comboBoxKey, reactive({
  slots: computed(() => comboBoxVariants({ fullWidth: props.fullWidth })),
  open: toRef(open),
}))
</script>

<template>
  <!-- unmount-on-hide off: items stay mounted while closed, so their text is known before the first open -->
  <ComboboxRoot
    v-model="model"
    v-model:open="open"
    as-child
    :name="name"
    :disabled="isDisabled"
    :required="isRequired"
    :open-on-focus="menuTrigger === 'focus'"
    :open-on-click="menuTrigger === 'focus'"
    :unmount-on-hide="false"
  >
    <Bridge data-slot="combo-box" :class="comboBoxVariants({ fullWidth }).base()" v-bind="fieldStateAttrs(props)">
      <slot :open="open" />
    </Bridge>
  </ComboboxRoot>
</template>
