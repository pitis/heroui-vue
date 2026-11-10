import { DateInputGroupInput, DateInputGroupInputContainer, DateInputGroupPrefix, DateInputGroupRoot, DateInputGroupSegment, DateInputGroupSuffix } from '../date-input-group'
import TimeFieldRoot from './TimeField.vue'

export { timeFieldVariants } from '@heroui/styles'

const TimeField = Object.assign(TimeFieldRoot, {
  Root: TimeFieldRoot,
  Group: DateInputGroupRoot,
  Input: DateInputGroupInput,
  InputContainer: DateInputGroupInputContainer,
  Segment: DateInputGroupSegment,
  Prefix: DateInputGroupPrefix,
  Suffix: DateInputGroupSuffix,
})

export { TimeField, TimeFieldRoot }
