import ColorAreaRoot from './ColorArea.vue'
import ColorAreaThumb from './ColorAreaThumb.vue'

export { colorAreaVariants } from '@heroui/styles'

const ColorArea = Object.assign(ColorAreaRoot, { Root: ColorAreaRoot, Thumb: ColorAreaThumb })

export { ColorArea, ColorAreaRoot, ColorAreaThumb }
