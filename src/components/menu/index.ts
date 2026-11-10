import { MenuItemIndicator, MenuItemRoot } from '../menu-item'
import { MenuSectionRoot } from '../menu-section'
import MenuRoot from './Menu.vue'

export { menuVariants } from '@heroui/styles'

const Menu = Object.assign(MenuRoot, { Root: MenuRoot, Item: MenuItemRoot, ItemIndicator: MenuItemIndicator, Section: MenuSectionRoot })

export { Menu, MenuRoot }
