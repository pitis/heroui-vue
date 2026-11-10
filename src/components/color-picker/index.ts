import ColorPickerRoot from './ColorPicker.vue'
import { ColorPickerPopover, ColorPickerTrigger } from './ColorPickerParts'

export { colorPickerVariants } from '@heroui/styles'
export { type ColorValue, toCssColor } from './context'
// Reka's color helpers, to build and convert values
export { colorToString, getChannelValue, normalizeColor, parseColor, setChannelValue } from 'reka-ui'
export type { Color, ColorChannel, ColorSpace } from 'reka-ui'

const ColorPicker = Object.assign(ColorPickerRoot, { Root: ColorPickerRoot, Trigger: ColorPickerTrigger, Popover: ColorPickerPopover })

export { ColorPicker, ColorPickerPopover, ColorPickerRoot, ColorPickerTrigger }
