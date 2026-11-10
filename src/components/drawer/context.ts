import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type DrawerPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface DrawerContext {
  open: Ref<boolean>
}

export interface DrawerLayout {
  isDismissable: boolean
  placement: DrawerPlacement
}

export const drawerKey: InjectionKey<DrawerContext> = Symbol('heroui-drawer')
export const drawerLayoutKey: InjectionKey<ComputedRef<Partial<DrawerLayout>>> = Symbol('heroui-drawer-layout')
