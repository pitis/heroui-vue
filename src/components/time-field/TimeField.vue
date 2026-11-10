<script setup lang="ts">
import type { TimeValue } from 'reka-ui'
import { timeFieldVariants } from '@heroui/styles'
import { TimeFieldRoot } from 'reka-ui'
import { computed, provide, reactive } from 'vue'
import { Bridge } from '../../utils/bridge'
import { fieldStateAttrs, provideField } from '../../utils/field'
import { dateFieldKey } from '../date-input-group/context'
import SegmentsScope from '../date-input-group/SegmentsScope'

const props = defineProps<{
  granularity?: 'hour' | 'minute' | 'second'
  hourCycle?: 12 | 24
  minValue?: TimeValue
  maxValue?: TimeValue
  placeholderValue?: TimeValue
  hideTimeZone?: boolean
  locale?: string
  name?: string
  fullWidth?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  isInvalid?: boolean
  isRequired?: boolean
}>()

/** A `Time` (or date-time) from @internationalized/date. */
const model = defineModel<TimeValue>()

const field = provideField(props)
provide(dateFieldKey, reactive({ kind: 'time' as const, segments: [], isEmpty: computed(() => model.value == null) }))
</script>

<template>
  <TimeFieldRoot
    v-slot="{ segments }"
    v-model="model"
    as-child
    :granularity="granularity"
    :hour-cycle="hourCycle"
    :min-value="minValue"
    :max-value="maxValue"
    :placeholder="placeholderValue"
    :hide-time-zone="hideTimeZone"
    :locale="locale"
    :name="name"
    :disabled="isDisabled"
    :readonly="isReadOnly"
    :required="isRequired"
  >
    <Bridge
      data-slot="time-field"
      :class="timeFieldVariants({ fullWidth })"
      :aria-labelledby="field.labelId"
      :aria-describedby="`${field.descriptionId} ${field.errorId}`"
      v-bind="fieldStateAttrs(props)"
    >
      <SegmentsScope :segments="segments">
        <slot />
      </SegmentsScope>
    </Bridge>
  </TimeFieldRoot>
</template>
