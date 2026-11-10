<script setup lang="ts">
import type { SwitchVariants } from '@heroui/styles'
import { switchVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { switchKey } from './context'

const props = defineProps<{
  size?: SwitchVariants['size']
  name?: string
  value?: string
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
}>()

const model = defineModel<boolean>({ default: false })

// the Label sits inside the clickable Switch.Content, so it must be a <span>
provideField(props, 'span')
provide(switchKey, {
  isSelected: computed(() => model.value),
  isDisabled: computed(() => props.isDisabled),
  isRequired: computed(() => props.isRequired),
  name: computed(() => props.name),
  value: computed(() => props.value),
  setSelected: (selected) => {
    if (!props.isReadOnly)
      model.value = selected
  },
})
</script>

<template>
  <div
    data-slot="switch"
    :class="switchVariants({ size }).base()"
    :data-selected="model || undefined"
    v-bind="fieldStateAttrs(props)"
  >
    <slot :is-selected="model" />
  </div>
</template>
