import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface TabsContext {
  selectedKey: Ref<string | undefined>
  /** Where the selection indicator last was, so the next one can slide from there. */
  indicatorRect?: DOMRect
}

export const tabsKey: InjectionKey<TabsContext> = Symbol('heroui-tabs')
export const tabKey: InjectionKey<ComputedRef<boolean>> = Symbol('heroui-tab-selected')
