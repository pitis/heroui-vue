<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { DateRange } from 'reka-ui'
import { dateRangePickerVariants } from '@heroui/styles'
import { DateRangeFieldRoot, PopoverRoot } from 'reka-ui'
import { computed, provide, reactive } from 'vue'
import { Bridge } from '../../utils/bridge'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { dateFieldKey, pickerAnchorKey } from '../date-input-group/context'
import SegmentsScope from '../date-input-group/SegmentsScope'
import { datePickerKey } from '../date-picker/context'

// Two date inputs (slot="start" / slot="end") plus a popover; a RangeCalendar inside edits the same range.
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

/** `{ start, end }` */
const model = defineModel<DateRange>()
const open = defineModel<boolean>('open', { default: false })

const field = provideField(props)
provide(dateFieldKey, reactive({ kind: 'range' as const, segments: { start: [], end: [] }, isEmpty: computed(() => !model.value?.start) }))
provide(pickerAnchorKey, true)
provide(datePickerKey, {
  kind: 'range',
  get: () => model.value,
  set(value) {
    const range = value as DateRange | undefined
    model.value = range
    // the popover closes once both ends are picked (check `range`: with a parent v-model, model.value updates later)
    if (range?.start && range.end)
      open.value = false
  },
})
</script>

<template>
  <PopoverRoot v-model:open="open">
    <DateRangeFieldRoot
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
        data-slot="date-range-picker"
        :class="dateRangePickerVariants().base()"
        :aria-labelledby="field.labelId"
        :aria-describedby="`${field.descriptionId} ${field.errorId}`"
        v-bind="fieldStateAttrs(props)"
      >
        <SegmentsScope :segments="segments">
          <slot :open="open" />
        </SegmentsScope>
      </Bridge>
    </DateRangeFieldRoot>
  </PopoverRoot>
</template>
