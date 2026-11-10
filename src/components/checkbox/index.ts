import { checkboxVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import CheckboxRoot from './Checkbox.vue'
import CheckboxContent from './CheckboxContent.vue'
import CheckboxIndicator from './CheckboxIndicator.vue'

export { checkboxVariants }

const CheckboxControl = part('CheckboxControl', 'span', 'checkbox-control', checkboxVariants().control())

const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  Content: CheckboxContent,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
})

export { Checkbox, CheckboxContent, CheckboxControl, CheckboxIndicator, CheckboxRoot }
