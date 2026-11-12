import { popoverVariants } from '@heroui/styles'
import { PopoverAnchor } from 'reka-ui'
import { part } from '../../utils/part'
import PopoverRoot from './Popover.vue'
import PopoverArrow from './PopoverArrow.vue'
import PopoverContent from './PopoverContent.vue'
import PopoverTrigger from './PopoverTrigger.vue'

export { popoverVariants }

const slots = popoverVariants()
// Popover.Content already carries role="dialog"
const PopoverDialog = part('PopoverDialog', 'div', 'popover-dialog', slots.dialog())
const PopoverHeading = part('PopoverHeading', 'h3', 'popover-heading', slots.heading())

const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  // Vue-only: positions the popover against another element than the trigger, or with no trigger at all
  Anchor: PopoverAnchor,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  Dialog: PopoverDialog,
  Heading: PopoverHeading,
})

export { Popover, PopoverAnchor, PopoverArrow, PopoverContent, PopoverDialog, PopoverHeading, PopoverRoot, PopoverTrigger }
