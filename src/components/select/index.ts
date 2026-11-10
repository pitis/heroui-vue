import SelectRoot from './Select.vue'
import SelectClearButton from './SelectClearButton.vue'
import SelectIndicator from './SelectIndicator.vue'
import SelectPopover from './SelectPopover.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectValue from './SelectValue.vue'

export { selectVariants } from '@heroui/styles'

const Select = Object.assign(SelectRoot, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Indicator: SelectIndicator,
  ClearButton: SelectClearButton,
  Popover: SelectPopover,
})

export { Select, SelectClearButton, SelectIndicator, SelectPopover, SelectRoot, SelectTrigger, SelectValue }
