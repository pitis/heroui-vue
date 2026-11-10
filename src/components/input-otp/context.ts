import type { inputOTPVariants } from '@heroui/styles'
import type { InjectionKey } from 'vue'

export interface InputOTPSlotState {
  char?: string
  isActive: boolean
  hasFakeCaret: boolean
}

/** Provided as a reactive object. */
export interface InputOTPContext {
  slots: ReturnType<typeof inputOTPVariants>
  isDisabled?: boolean
  isInvalid?: boolean
  slotState: (index: number) => InputOTPSlotState
}

export const inputOTPKey: InjectionKey<InputOTPContext> = Symbol('heroui-input-otp')

export const REGEXP_ONLY_DIGITS = '^\\d+$'
export const REGEXP_ONLY_CHARS = '^[a-zA-Z]+$'
export const REGEXP_ONLY_DIGITS_AND_CHARS = '^[a-zA-Z0-9]+$'
