import { MenuItemIndicator, MenuItemRoot, MenuItemSubmenuIndicator } from '../menu-item'
import { MenuSectionRoot } from '../menu-section'
import DropdownRoot from './Dropdown.vue'
import DropdownMenu from './DropdownMenu.vue'
import DropdownPopover from './DropdownPopover.vue'
import DropdownSubmenuTrigger from './DropdownSubmenuTrigger.vue'
import DropdownTrigger from './DropdownTrigger.vue'

export { dropdownVariants } from '@heroui/styles'

const DropdownItem = MenuItemRoot
const DropdownItemIndicator = MenuItemIndicator
const DropdownSubmenuIndicator = MenuItemSubmenuIndicator
const DropdownSection = MenuSectionRoot

const Dropdown = Object.assign(DropdownRoot, {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Popover: DropdownPopover,
  Menu: DropdownMenu,
  Section: DropdownSection,
  Item: DropdownItem,
  ItemIndicator: DropdownItemIndicator,
  SubmenuIndicator: DropdownSubmenuIndicator,
  SubmenuTrigger: DropdownSubmenuTrigger,
})

export { Dropdown, DropdownItem, DropdownItemIndicator, DropdownMenu, DropdownPopover, DropdownRoot, DropdownSection, DropdownSubmenuIndicator, DropdownSubmenuTrigger, DropdownTrigger }
