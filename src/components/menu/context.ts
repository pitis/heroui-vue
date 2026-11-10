import type { InjectionKey } from 'vue'

export type SelectionMode = 'none' | 'single' | 'multiple'

/** Provided as a reactive object by Menu (and Dropdown.Menu). */
export interface MenuContext {
  /** 'dropdown': inside Dropdown.Popover, items are Reka menu items. 'standalone': a menu on the page. */
  kind: 'dropdown' | 'standalone'
  selectionMode: SelectionMode
  isSelected: (id: string) => boolean
  toggle: (id: string) => void
  action: (id: string) => void
}

export const menuKey: InjectionKey<MenuContext> = Symbol('heroui-menu')
/** Set by Dropdown.Popover so the Menu inside knows it lives in a dropdown. */
export const inDropdownKey: InjectionKey<boolean> = Symbol('heroui-in-dropdown')
/** Set by Dropdown.SubmenuTrigger: its Item becomes the submenu trigger, its Popover the submenu. */
export const submenuKey: InjectionKey<{ claimed: boolean } | null> = Symbol('heroui-submenu')
/** The enclosing menu item, for its indicators. */
export const menuItemKey: InjectionKey<{ id: string, hasSubmenu: boolean }> = Symbol('heroui-menu-item')
