import { chipVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import ChipRoot from './Chip.vue'

export { chipVariants }

const ChipLabel = part('ChipLabel', 'span', 'chip-label', chipVariants().label())

const Chip = Object.assign(ChipRoot, { Root: ChipRoot, Label: ChipLabel })

export { Chip, ChipLabel, ChipRoot }
