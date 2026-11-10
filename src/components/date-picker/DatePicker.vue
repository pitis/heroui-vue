<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { datePickerVariants } from '@heroui/styles'
import { DateFieldRoot, PopoverRoot } from 'reka-ui'
import { computed, provide, reactive } from 'vue'
import { Bridge } from '../../utils/bridge'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { dateFieldKey, pickerAnchorKey } from '../date-input-group/context'
import SegmentsScope from '../date-input-group/SegmentsScope'
import { datePickerKey } from './context'

// A DateField plus a popover; a Calendar inside the popover edits the same value.
const props = defineProps<{
  granularity?: 'day' | 'hour' | 'minute' | 'second'
  hourCycle?: 12 | 24
  minValue?: DateValue
  maxValue?: DateValue
  isDateUnavailable?: (date: DateValue) => boolean
  placeholderValue?: DateValue
  locale?: string
  name?: string
  isDisabled?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
  isRequired?: boolean
}>()

const model = defineModel<DateValue>()
const open = defineModel<boolean>('open', { default: false })

const field = provideField(props)
provide(dateFieldKey, reactive({ kind: 'date' as const, segments: [], isEmpty: computed(() => model.value == null) }))
provide(pickerAnchorKey, true)
provide(datePickerKey, {
  kind: 'single',
  get: () => model.value,
  set(value) {
    model.value = value as DateValue
    open.value = false
  },
})
</script>

<template>
  <PopoverRoot v-model:open="open">
    <DateFieldRoot
      v-slot="{ segments }"
      v-model="model"
      as-child
      :granularity="granularity"
      :hour-cycle="hourCycle"
      :min-value="minValue"
      :max-value="maxValue"
      :is-date-unavailable="isDateUnavailable"
      :placeholder="placeholderValue"
      :locale="locale"
      :name="name"
      :disabled="isDisabled"
      :readonly="isReadOnly"
      :required="isRequired"
    >
      <Bridge
        data-slot="date-picker"
        :class="datePickerVariants().base()"
        :aria-labelledby="field.labelId"
        :aria-describedby="`${field.descriptionId} ${field.errorId}`"
        v-bind="fieldStateAttrs(props)"
      >
        <SegmentsScope :segments="segments">
          <slot :open="open" />
        </SegmentsScope>
      </Bridge>
    </DateFieldRoot>
  </PopoverRoot>
</template>
