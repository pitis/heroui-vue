<script setup lang="ts">
import type { CheckboxVariants } from '@heroui/styles'
import { checkboxVariants } from '@heroui/styles'
import { computed, inject, provide, reactive } from 'vue'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { checkboxGroupKey } from '../checkbox-group/context'
import { checkboxKey } from './context'
import { useRootAttrs } from '../../utils/control-attrs'

defineOptions({ inheritAttrs: false })

// id and aria-* name the control inside *.Content, the rest stays here (as in React Aria)
const rootAttrs = useRootAttrs()

const props = withDefaults(defineProps<{
  variant?: CheckboxVariants['variant']
  /** Identifies this checkbox inside a CheckboxGroup, and is the submitted form value. */
  value?: string
  name?: string
  isIndeterminate?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
}>(), { isDisabled: undefined, isInvalid: undefined, isReadOnly: undefined })

/** Selected state. Ignored inside a CheckboxGroup, where the group's v-model owns it. */
const model = defineModel<boolean>({ default: false })

const group = inject(checkboxGroupKey, undefined)
const inGroup = computed(() => group != null && props.value != null)

const isSelected = computed(() => (inGroup.value ? group!.has(props.value!) : model.value))
// unset state props inherit from the group
const state = reactive({
  isDisabled: computed(() => props.isDisabled ?? group?.isDisabled.value),
  isInvalid: computed(() => props.isInvalid ?? group?.isInvalid.value),
  isReadOnly: computed(() => props.isReadOnly ?? group?.isReadOnly.value),
  isRequired: computed(() => props.isRequired),
})

function setSelected(selected: boolean) {
  if (state.isReadOnly)
    return
  if (inGroup.value)
    group!.set(props.value!, selected)
  else
    model.value = selected
}

// the Label sits inside the clickable Checkbox.Content, so it must be a <span>
provideField(state, 'span')
provide(checkboxKey, {
  isSelected,
  isIndeterminate: computed(() => props.isIndeterminate),
  isDisabled: computed(() => state.isDisabled),
  isRequired: computed(() => state.isRequired),
  name: computed(() => props.name ?? group?.name.value),
  value: computed(() => props.value),
  setSelected,
})
</script>

<template>
  <div
    data-slot="checkbox"
    :class="checkboxVariants({ variant: variant ?? group?.variant.value }).base()"
    :data-selected="isSelected || undefined"
    :data-indeterminate="isIndeterminate || undefined"
    v-bind="{ ...rootAttrs(), ...fieldStateAttrs(state) }"
  >
    <slot :is-selected="isSelected" :is-indeterminate="isIndeterminate" />
  </div>
</template>
