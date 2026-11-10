<script setup lang="ts">
import { sliderVariants } from '@heroui/styles'
import { SliderRoot } from 'reka-ui'
import { computed, onBeforeUnmount, provide, shallowRef } from 'vue'
import { Bridge } from '../../utils/bridge'
import { provideField } from '../../utils/field'
import { sliderKey } from './context'

const props = withDefaults(defineProps<{
  minValue?: number
  maxValue?: number
  step?: number
  orientation?: 'horizontal' | 'vertical'
  /** Format of Output, marks and the thumbs' aria-valuetext. */
  formatOptions?: Intl.NumberFormatOptions
  name?: string
  isDisabled?: boolean
}>(), { minValue: 0, maxValue: 100, step: 1, orientation: 'horizontal' })

const emit = defineEmits<{
  /** The user finished dragging or used the keyboard. */
  changeEnd: [value: number | number[]]
}>()

/** A number for one thumb, an array for a range (one thumb per entry). */
const model = defineModel<number | number[]>({ default: 0 })
const values = computed(() => (Array.isArray(model.value) ? model.value : [model.value]))
const isRange = computed(() => Array.isArray(model.value))

function update(next: number[] | undefined) {
  if (next)
    model.value = isRange.value ? next : next[0]!
}

const isDragging = shallowRef(false)
const stopDragging = () => (isDragging.value = false)
function startDragging() {
  isDragging.value = true
  window.addEventListener('pointerup', stopDragging, { once: true })
}
onBeforeUnmount(() => window.removeEventListener('pointerup', stopDragging))

provideField(props, 'span')
provide(sliderKey, {
  values,
  min: computed(() => props.minValue),
  max: computed(() => props.maxValue),
  step: computed(() => props.step),
  orientation: computed(() => props.orientation),
  isDisabled: computed(() => props.isDisabled),
  format: computed(() => new Intl.NumberFormat(undefined, props.formatOptions).format),
  isDragging,
})
</script>

<template>
  <!-- thumbAlignment overflow: thumb centers sit exactly on their value, as in React Aria; the CSS adds the edge room -->
  <SliderRoot
    as-child
    :model-value="values"
    :min="minValue"
    :max="maxValue"
    :step="step"
    :orientation="orientation"
    :disabled="isDisabled"
    :name="name"
    thumb-alignment="overflow"
    @update:model-value="update"
    @value-commit="emit('changeEnd', isRange ? $event : $event[0]!)"
  >
    <Bridge data-slot="slider" :class="sliderVariants().base()" :data-disabled="isDisabled || undefined" @pointerdown="startDragging">
      <slot :values="values" />
    </Bridge>
  </SliderRoot>
</template>
