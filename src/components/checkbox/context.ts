import type { ComputedRef, InjectionKey } from 'vue'

export interface CheckboxContext {
  isSelected: ComputedRef<boolean>
  isIndeterminate: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean | undefined>
  isRequired: ComputedRef<boolean | undefined>
  name: ComputedRef<string | undefined>
  value: ComputedRef<string | undefined>
  setSelected: (selected: boolean) => void
}

export const checkboxKey: InjectionKey<CheckboxContext> = Symbol('heroui-checkbox')
