import DatePickerRoot from './DatePicker.vue'
import { datePickerParts } from './PickerParts'

export { datePickerVariants } from '@heroui/styles'

const { Trigger: DatePickerTrigger, TriggerIndicator: DatePickerTriggerIndicator, Popover: DatePickerPopover } = datePickerParts

const DatePicker = Object.assign(DatePickerRoot, {
  Root: DatePickerRoot,
  Trigger: DatePickerTrigger,
  TriggerIndicator: DatePickerTriggerIndicator,
  Popover: DatePickerPopover,
})

export { DatePicker, DatePickerPopover, DatePickerRoot, DatePickerTrigger, DatePickerTriggerIndicator }
