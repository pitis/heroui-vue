import type { ColorChannel } from 'reka-ui'
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { ColorValue } from '../color-picker/context'

export interface ColorSliderContext {
  value: Ref<ColorValue | undefined>
  channel: ComputedRef<ColorChannel>
  orientation: ComputedRef<'horizontal' | 'vertical'>
  isDisabled: ComputedRef<boolean | undefined>
  dragging: Ref<boolean>
}

export const colorSliderKey: InjectionKey<ColorSliderContext> = Symbol('heroui-color-slider')
