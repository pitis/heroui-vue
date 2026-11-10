import ComboBoxRoot from './ComboBox.vue'
import ComboBoxInputGroup from './ComboBoxInputGroup.vue'
import ComboBoxPopover from './ComboBoxPopover.vue'
import ComboBoxTrigger from './ComboBoxTrigger.vue'

export { comboBoxVariants } from '@heroui/styles'

// shortcut: no ComboBox.Value part (React shows the selected item's text outside the input); the Input already shows it
const ComboBox = Object.assign(ComboBoxRoot, {
  Root: ComboBoxRoot,
  InputGroup: ComboBoxInputGroup,
  Trigger: ComboBoxTrigger,
  Popover: ComboBoxPopover,
})

export { ComboBox, ComboBoxInputGroup, ComboBoxPopover, ComboBoxRoot, ComboBoxTrigger }
