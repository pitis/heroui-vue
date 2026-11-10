import ColorSliderRoot from './ColorSlider.vue'
import ColorSliderOutput from './ColorSliderOutput.vue'
import ColorSliderThumb from './ColorSliderThumb.vue'
import ColorSliderTrack from './ColorSliderTrack.vue'

export { colorSliderVariants } from '@heroui/styles'

const ColorSlider = Object.assign(ColorSliderRoot, { Root: ColorSliderRoot, Output: ColorSliderOutput, Track: ColorSliderTrack, Thumb: ColorSliderThumb })

export { ColorSlider, ColorSliderOutput, ColorSliderRoot, ColorSliderThumb, ColorSliderTrack }
