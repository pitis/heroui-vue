<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { dateFieldVariants } from '@heroui/styles'
import { DateFieldRoot } from 'reka-ui'
import { computed, provide, reactive } from 'vue'
import { Bridge } from '../../utils/bridge'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { dateFieldKey } from '../date-input-group/context'
import SegmentsScope from '../date-input-group/SegmentsScope'

const props = defineProps<{
  /** Smallest unit shown: 'day' for dates, 'minute'/'second' adds a time. */
  granularity?: 'day' | 'hour' | 'minute' | 'second'
  hourCycle?: 12 | 24
  minValue?: DateValue
  maxValue?: DateValue
  isDateUnavailable?: (date: DateValue) => boolean
  /** Shown in empty segments' place, e.g. for the default month/year. */
  placeholderValue?: DateValue
  hideTimeZone?: boolean
  locale?: string
  name?: string
  fullWidth?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
  isRequired?: boolean
}>()

const model = defineModel<DateValue>()

const field = provideField(props)
provide(dateFieldKey, reactive({ kind: 'date' as const, segments: [], isEmpty: computed(() => model.value == null) }))
</script>

<template>
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
    :hide-time-zone="hideTimeZone"
    :locale="locale"
    :name="name"
    :disabled="isDisabled"
    :readonly="isReadOnly"
    :required="isRequired"
  >
    <Bridge
      data-slot="date-field"
      :class="dateFieldVariants({ fullWidth })"
      :aria-labelledby="field.labelId"
      :aria-describedby="`${field.descriptionId} ${field.errorId}`"
      v-bind="fieldStateAttrs(props)"
    >
      <SegmentsScope :segments="segments">
        <slot />
      </SegmentsScope>
    </Bridge>
  </DateFieldRoot>
</template>
