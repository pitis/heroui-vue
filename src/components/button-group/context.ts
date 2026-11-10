import type { ButtonVariants } from '@heroui/styles'
import type { ComputedRef, InjectionKey } from 'vue'

export interface ButtonGroupContext {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  fullWidth?: boolean
  isDisabled?: boolean
}

export const buttonGroupKey: InjectionKey<ComputedRef<ButtonGroupContext>> = Symbol('heroui-button-group')
