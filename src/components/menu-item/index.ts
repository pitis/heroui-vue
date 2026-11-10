import MenuItemRoot from './MenuItem.vue'
import MenuItemIndicator from './MenuItemIndicator.vue'
import MenuItemSubmenuIndicator from './MenuItemSubmenuIndicator.vue'

export { menuItemVariants } from '@heroui/styles'

const MenuItem = Object.assign(MenuItemRoot, { Root: MenuItemRoot, Indicator: MenuItemIndicator, SubmenuIndicator: MenuItemSubmenuIndicator })

export { MenuItem, MenuItemIndicator, MenuItemRoot, MenuItemSubmenuIndicator }
