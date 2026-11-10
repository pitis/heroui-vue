import ColorSwatchPickerRoot from './ColorSwatchPicker.vue'
import ColorSwatchPickerIndicator from './ColorSwatchPickerIndicator.vue'
import ColorSwatchPickerItem from './ColorSwatchPickerItem.vue'
import ColorSwatchPickerSwatch from './ColorSwatchPickerSwatch.vue'

export { colorSwatchPickerVariants } from '@heroui/styles'

const ColorSwatchPicker = Object.assign(ColorSwatchPickerRoot, {
  Root: ColorSwatchPickerRoot,
  Item: ColorSwatchPickerItem,
  Swatch: ColorSwatchPickerSwatch,
  Indicator: ColorSwatchPickerIndicator,
})

export { ColorSwatchPicker, ColorSwatchPickerIndicator, ColorSwatchPickerItem, ColorSwatchPickerRoot, ColorSwatchPickerSwatch }
