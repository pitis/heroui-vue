import { buttonGroupVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import ButtonGroupRoot from './ButtonGroup.vue'

export { buttonGroupVariants }

const ButtonGroupSeparator = part('ButtonGroupSeparator', 'span', 'button-group-separator', buttonGroupVariants().separator(), { 'aria-hidden': 'true' })

const ButtonGroup = Object.assign(ButtonGroupRoot, { Root: ButtonGroupRoot, Separator: ButtonGroupSeparator })

export { ButtonGroup, ButtonGroupRoot, ButtonGroupSeparator }
