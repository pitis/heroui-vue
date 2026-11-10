import type { ComputedRef, InjectionKey } from 'vue'

export interface RadioContext {
  value: string
  isDisabled: ComputedRef<boolean | undefined>
  isSelected: ComputedRef<boolean>
}

export const radioKey: InjectionKey<RadioContext> = Symbol('heroui-radio')
