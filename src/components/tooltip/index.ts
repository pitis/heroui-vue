import TooltipRoot from './Tooltip.vue'
import TooltipArrow from './TooltipArrow.vue'
import TooltipContent from './TooltipContent.vue'
import TooltipTrigger from './TooltipTrigger.vue'

export { tooltipVariants } from '@heroui/styles'

const Tooltip = Object.assign(TooltipRoot, { Root: TooltipRoot, Trigger: TooltipTrigger, Content: TooltipContent, Arrow: TooltipArrow })

export { Tooltip, TooltipArrow, TooltipContent, TooltipRoot, TooltipTrigger }
