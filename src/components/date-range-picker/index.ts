import { dateRangePickerVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import { dateRangePickerParts } from '../date-picker/PickerParts'
import DateRangePickerRoot from './DateRangePicker.vue'

export { dateRangePickerVariants }

const { Trigger: DateRangePickerTrigger, TriggerIndicator: DateRangePickerTriggerIndicator, Popover: DateRangePickerPopover } = dateRangePickerParts
/** The dash between the start and end inputs. */
const DateRangePickerRangeSeparator = part('DateRangePickerRangeSeparator', 'span', 'date-range-picker-range-separator', dateRangePickerVariants().rangeSeparator(), { 'aria-hidden': 'true', 'innerHTML': '&ndash;' })

const DateRangePicker = Object.assign(DateRangePickerRoot, {
  Root: DateRangePickerRoot,
  Trigger: DateRangePickerTrigger,
  TriggerIndicator: DateRangePickerTriggerIndicator,
  RangeSeparator: DateRangePickerRangeSeparator,
  Popover: DateRangePickerPopover,
})

export { DateRangePicker, DateRangePickerPopover, DateRangePickerRangeSeparator, DateRangePickerRoot, DateRangePickerTrigger, DateRangePickerTriggerIndicator }
