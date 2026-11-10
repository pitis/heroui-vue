import type { ComputedRef, InjectionKey } from 'vue'

export interface RadioGroupContext {
  value: ComputedRef<string | undefined>
  isDisabled: ComputedRef<boolean | undefined>
  isInvalid: ComputedRef<boolean | undefined>
  isReadOnly: ComputedRef<boolean | undefined>
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('heroui-radio-group')
