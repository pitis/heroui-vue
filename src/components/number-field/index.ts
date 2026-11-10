import NumberFieldRoot from './NumberField.vue'
import { NumberFieldDecrementButton, NumberFieldIncrementButton } from './NumberFieldButton'
import NumberFieldGroup from './NumberFieldGroup.vue'
import NumberFieldInput from './NumberFieldInput.vue'

export { numberFieldVariants } from '@heroui/styles'

const NumberField = Object.assign(NumberFieldRoot, {
  Root: NumberFieldRoot,
  Group: NumberFieldGroup,
  Input: NumberFieldInput,
  IncrementButton: NumberFieldIncrementButton,
  DecrementButton: NumberFieldDecrementButton,
})

export { NumberField, NumberFieldDecrementButton, NumberFieldGroup, NumberFieldIncrementButton, NumberFieldInput, NumberFieldRoot }
