import { colorInputGroupVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import ColorInputGroupRoot from './ColorInputGroup.vue'
import ColorInputGroupInput from './ColorInputGroupInput.vue'

export { colorInputGroupVariants }

const slots = colorInputGroupVariants()
const ColorInputGroupPrefix = part('ColorInputGroupPrefix', 'div', 'color-input-group-prefix', slots.prefix())
const ColorInputGroupSuffix = part('ColorInputGroupSuffix', 'div', 'color-input-group-suffix', slots.suffix())

const ColorInputGroup = Object.assign(ColorInputGroupRoot, { Root: ColorInputGroupRoot, Input: ColorInputGroupInput, Prefix: ColorInputGroupPrefix, Suffix: ColorInputGroupSuffix })

export { ColorInputGroup, ColorInputGroupInput, ColorInputGroupPrefix, ColorInputGroupRoot, ColorInputGroupSuffix }
