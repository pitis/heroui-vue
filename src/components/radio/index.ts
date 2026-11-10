import { radioVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import RadioRoot from './Radio.vue'
import RadioContent from './RadioContent.vue'

export { radioVariants }

const slots = radioVariants()
const RadioControl = part('RadioControl', 'span', 'radio-control', slots.control())
// empty by default: the CSS draws the dot; put an icon inside to replace it
const RadioIndicator = part('RadioIndicator', 'span', 'radio-indicator', slots.indicator(), { 'aria-hidden': 'true' })

const Radio = Object.assign(RadioRoot, { Root: RadioRoot, Content: RadioContent, Control: RadioControl, Indicator: RadioIndicator })

export { Radio, RadioContent, RadioControl, RadioIndicator, RadioRoot }
