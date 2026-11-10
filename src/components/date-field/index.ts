import { DateInputGroupInput, DateInputGroupInputContainer, DateInputGroupPrefix, DateInputGroupRoot, DateInputGroupSegment, DateInputGroupSuffix } from '../date-input-group'
import DateFieldRoot from './DateField.vue'

export { dateFieldVariants } from '@heroui/styles'

const DateField = Object.assign(DateFieldRoot, {
  Root: DateFieldRoot,
  Group: DateInputGroupRoot,
  Input: DateInputGroupInput,
  InputContainer: DateInputGroupInputContainer,
  Segment: DateInputGroupSegment,
  Prefix: DateInputGroupPrefix,
  Suffix: DateInputGroupSuffix,
})

export { DateField, DateFieldRoot }
