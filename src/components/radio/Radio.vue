<script setup lang="ts">
import { radioVariants } from '@heroui/styles'
import { computed, inject, provide, reactive } from 'vue'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { radioGroupKey } from '../radio-group/context'
import { radioKey } from './context'
import { useRootAttrs } from '../../utils/control-attrs'

defineOptions({ inheritAttrs: false })

// id and aria-* name the control inside *.Content, the rest stays here (as in React Aria)
const rootAttrs = useRootAttrs()

// Must sit inside a RadioGroup, which owns the selected value.
const props = defineProps<{
  value: string
  isDisabled?: boolean
}>()

const group = inject(radioGroupKey)!
const isSelected = computed(() => group.value.value === props.value)
const state = reactive({
  isDisabled: computed(() => props.isDisabled || group.isDisabled.value),
  isInvalid: computed(() => group.isInvalid.value),
  isReadOnly: computed(() => group.isReadOnly.value),
})

// the Label sits inside the clickable Radio.Content, so it must be a <span>
provideField(state, 'span')
provide(radioKey, { value: props.value, isDisabled: computed(() => state.isDisabled), isSelected })
</script>

<template>
  <div
    data-slot="radio"
    :class="radioVariants().base()"
    :data-selected="isSelected || undefined"
    v-bind="{ ...rootAttrs(), ...fieldStateAttrs(state) }"
  >
    <slot :is-selected="isSelected" />
  </div>
</template>
