<script setup lang="ts">
import type { ToggleButtonVariants } from '@heroui/styles'
import { toggleButtonVariants } from '@heroui/styles'
import { Toggle, ToggleGroupItem } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { toggleButtonGroupKey } from '../toggle-button-group/context'

const props = defineProps<{
  /** Key of this button inside a ToggleButtonGroup. */
  id?: string
  variant?: ToggleButtonVariants['variant']
  size?: ToggleButtonVariants['size']
  isIconOnly?: boolean
  isDisabled?: boolean
}>()

/** Selected state of a standalone ToggleButton; inside a group, the group's v-model owns it. */
const model = defineModel<boolean>({ default: false })

const group = inject(toggleButtonGroupKey, undefined)
if (group && props.id == null)
  console.warn('[heroui-vue] A ToggleButton inside a ToggleButtonGroup needs an `id`.')
</script>

<template>
  <component
    :is="group ? ToggleGroupItem : Toggle"
    v-bind="group ? { value: id } : { modelValue: model, 'onUpdate:modelValue': (v: boolean) => (model = v) }"
    as-child
    :disabled="isDisabled || group?.isDisabled.value"
  >
    <Bridge
      as="button"
      type="button"
      data-slot="toggle-button"
      :class="toggleButtonVariants({ isIconOnly, size: size ?? group?.size.value, variant })"
    >
      <slot />
    </Bridge>
  </component>
</template>
