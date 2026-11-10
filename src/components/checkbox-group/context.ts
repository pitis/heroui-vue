import type { CheckboxVariants } from '@heroui/styles'
import type { ComputedRef, InjectionKey } from 'vue'

export interface CheckboxGroupContext {
  variant: ComputedRef<CheckboxVariants['variant']>
  isDisabled: ComputedRef<boolean | undefined>
  isReadOnly: ComputedRef<boolean | undefined>
  isInvalid: ComputedRef<boolean | undefined>
  name: ComputedRef<string | undefined>
  has: (value: string) => boolean
  set: (value: string, selected: boolean) => void
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('heroui-checkbox-group')
