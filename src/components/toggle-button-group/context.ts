import type { ToggleButtonVariants } from '@heroui/styles'
import type { ComputedRef, InjectionKey } from 'vue'

export interface ToggleButtonGroupContext {
  size: ComputedRef<ToggleButtonVariants['size']>
  isDisabled: ComputedRef<boolean | undefined>
}

export const toggleButtonGroupKey: InjectionKey<ToggleButtonGroupContext> = Symbol('heroui-toggle-button-group')

/** Orientation a Toolbar hands down to the ToggleButtonGroups inside it. */
export const toolbarOrientationKey: InjectionKey<ComputedRef<'horizontal' | 'vertical'>> = Symbol('heroui-toolbar-orientation')
