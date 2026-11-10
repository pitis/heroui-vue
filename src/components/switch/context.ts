import type { ComputedRef, InjectionKey } from 'vue'

export interface SwitchContext {
  isSelected: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean | undefined>
  isRequired: ComputedRef<boolean | undefined>
  name: ComputedRef<string | undefined>
  value: ComputedRef<string | undefined>
  setSelected: (selected: boolean) => void
}

export const switchKey: InjectionKey<SwitchContext> = Symbol('heroui-switch')
