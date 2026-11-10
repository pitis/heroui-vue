import { ColorInputGroupInput, ColorInputGroupPrefix, ColorInputGroupRoot, ColorInputGroupSuffix } from '../color-input-group'
import ColorFieldRoot from './ColorField.vue'

export { colorFieldVariants } from '@heroui/styles'

const ColorField = Object.assign(ColorFieldRoot, {
  Root: ColorFieldRoot,
  Group: ColorInputGroupRoot,
  Input: ColorInputGroupInput,
  Prefix: ColorInputGroupPrefix,
  Suffix: ColorInputGroupSuffix,
})

export { ColorField, ColorFieldRoot }
