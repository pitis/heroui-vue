import { toggleButtonGroupVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import ToggleButtonGroupRoot from './ToggleButtonGroup.vue'

export { toggleButtonGroupVariants }

const ToggleButtonGroupSeparator = part('ToggleButtonGroupSeparator', 'span', 'toggle-button-group-separator', toggleButtonGroupVariants().separator(), { 'aria-hidden': 'true' })

const ToggleButtonGroup = Object.assign(ToggleButtonGroupRoot, { Root: ToggleButtonGroupRoot, Separator: ToggleButtonGroupSeparator })

export { ToggleButtonGroup, ToggleButtonGroupRoot, ToggleButtonGroupSeparator }
