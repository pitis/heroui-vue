<script setup lang="ts">
import type { InputOTPVariants } from '@heroui/styles'
import { inputOTPVariants } from '@heroui/styles'
import { computed, onBeforeUnmount, provide, reactive, shallowRef, useTemplateRef, watch } from 'vue'
import { useField } from '../../utils/field'
import { inputOTPKey } from './context'

// One real <input> stretched transparently over the visual slots (the `input-otp` package's technique,
// which @heroui/styles is written for): native typing, paste, autofill and SMS one-time-code all just work.
// class/style go on the container, every other attribute (aria-label, autofocus…) on the input.
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  maxLength: number
  /** Regex source each character must match, e.g. REGEXP_ONLY_DIGITS. */
  pattern?: string
  variant?: InputOTPVariants['variant']
  name?: string
  isDisabled?: boolean
  isInvalid?: boolean
}>(), { pattern: undefined, isInvalid: undefined })

const emit = defineEmits<{ complete: [value: string] }>()

const model = defineModel<string>({ default: '' })
const field = useField()
const input = useTemplateRef<HTMLInputElement>('input')
const focused = shallowRef(false)
const selection = shallowRef<[number, number]>([0, 0])
const slots = computed(() => inputOTPVariants({ variant: props.variant }))

// input-otp's caret rules: a caret inside the value selects one character (typing overwrites it);
// stepping back from such a selection collapses onto its start, so move one further back
function readSelection() {
  const el = input.value
  if (!el)
    return
  const length = el.value.length
  let start = el.selectionStart ?? 0
  let end = el.selectionEnd ?? 0
  const isInsertMode = start === length && length < props.maxLength
  if (length && start === end && !isInsertMode) {
    const [previousStart, previousEnd] = selection.value
    const back = start === props.maxLength || (start < previousEnd && previousStart !== previousEnd)
    start = Math.max(0, back ? start - 1 : start)
    end = start + 1
    el.setSelectionRange(start, end)
  }
  selection.value = [start, end]
}

// focus lands on the next empty slot (or the last one when full), wherever the click put the caret
function onFocus() {
  focused.value = true
  const el = input.value!
  el.setSelectionRange(Math.min(el.value.length, props.maxLength - 1), el.value.length)
  readSelection()
}
const onSelectionChange = () => document.activeElement === input.value && readSelection()
document.addEventListener('selectionchange', onSelectionChange)
onBeforeUnmount(() => document.removeEventListener('selectionchange', onSelectionChange))

function onInput(event: Event) {
  const el = event.target as HTMLInputElement
  const next = el.value.slice(0, props.maxLength)
  if (next && props.pattern && !new RegExp(props.pattern).test(next)) {
    el.value = model.value // reject the keystroke/paste
    return
  }
  model.value = next
  readSelection()
}

watch(model, (value, previous) => {
  if (value.length === props.maxLength && previous.length < props.maxLength)
    emit('complete', value)
})

function slotState(index: number) {
  const [start, end] = selection.value
  const char = model.value[index]
  const caret = Math.min(start, props.maxLength - 1)
  const isActive = focused.value && (start === end ? index === caret : index >= start && index < end)
  return { char, isActive, hasFakeCaret: isActive && start === end && !char }
}

provide(inputOTPKey, reactive({
  slots,
  isDisabled: computed(() => props.isDisabled),
  isInvalid: computed(() => props.isInvalid ?? field?.value.isInvalid),
  slotState,
}))
</script>

<template>
  <div
    :class="[slots.base(), $attrs.class]"
    :data-disabled="isDisabled || undefined"
    :data-invalid="isInvalid || undefined"
    style="cursor: text; user-select: none"
  >
    <slot :value="model" />
    <input
      ref="input"
      v-bind="{ ...$attrs, class: undefined }"
      :value="model"
      data-slot="input-otp"
      :class="slots.input()"
      :id="field?.id"
      :aria-labelledby="field?.labelId"
      :aria-describedby="field && `${field.descriptionId} ${field.errorId}`"
      :aria-invalid="isInvalid || undefined"
      :data-disabled="isDisabled || undefined"
      :data-invalid="isInvalid || undefined"
      :disabled="isDisabled"
      :name="name"
      :maxlength="maxLength"
      :pattern="pattern"
      :inputmode="pattern === '^\\d+$' ? 'numeric' : 'text'"
      autocomplete="one-time-code"
      spellcheck="false"
      style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: 1; color: transparent; background: transparent; caret-color: transparent; border: 0; outline: 0; box-shadow: none; font-size: 1px; letter-spacing: -0.5em"
      @input="onInput"
      @focus="onFocus"
      @blur="focused = false"
    >
  </div>
</template>
