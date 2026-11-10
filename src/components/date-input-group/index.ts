import { dateInputGroupVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import DateInputGroupRoot from './DateInputGroup.vue'
import DateInputGroupInput from './DateInputGroupInput.vue'
import DateInputGroupSegment from './DateInputGroupSegment.vue'

export { dateInputGroupVariants }

const slots = dateInputGroupVariants()
const DateInputGroupPrefix = part('DateInputGroupPrefix', 'div', 'date-input-group-prefix', slots.prefix())
const DateInputGroupSuffix = part('DateInputGroupSuffix', 'div', 'date-input-group-suffix', slots.suffix())
const DateInputGroupInputContainer = part('DateInputGroupInputContainer', 'div', 'date-input-group-input-container', slots.inputContainer())

const DateInputGroup = Object.assign(DateInputGroupRoot, {
  Root: DateInputGroupRoot,
  Input: DateInputGroupInput,
  InputContainer: DateInputGroupInputContainer,
  Segment: DateInputGroupSegment,
  Prefix: DateInputGroupPrefix,
  Suffix: DateInputGroupSuffix,
})

export { DateInputGroup, DateInputGroupInput, DateInputGroupInputContainer, DateInputGroupPrefix, DateInputGroupRoot, DateInputGroupSegment, DateInputGroupSuffix }
