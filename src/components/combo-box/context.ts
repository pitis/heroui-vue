import type { comboBoxVariants } from '@heroui/styles'
import type { InjectionKey } from 'vue'

/** Provided as a reactive object by ComboBox. */
export interface ComboBoxContext {
  slots: ReturnType<typeof comboBoxVariants>
  open: boolean
}

export const comboBoxKey: InjectionKey<ComboBoxContext> = Symbol('heroui-combo-box')
