import { switchVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import SwitchRoot from './Switch.vue'
import SwitchContent from './SwitchContent.vue'

export { switchVariants }

const SwitchControl = part('SwitchControl', 'span', 'switch-control', switchVariants().control())
const SwitchThumb = part('SwitchThumb', 'span', 'switch-thumb', switchVariants().thumb())
const SwitchIcon = part('SwitchIcon', 'span', 'switch-icon', switchVariants().icon())

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  Content: SwitchContent,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Icon: SwitchIcon,
})

export { Switch, SwitchContent, SwitchControl, SwitchIcon, SwitchRoot, SwitchThumb }
