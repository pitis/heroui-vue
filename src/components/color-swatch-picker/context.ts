import type { colorSwatchPickerVariants } from '@heroui/styles'
import type { InjectionKey } from 'vue'

export const colorSwatchPickerKey: InjectionKey<{ slots: ReturnType<typeof colorSwatchPickerVariants> }> = Symbol('heroui-color-swatch-picker')
export const colorSwatchPickerItemKey: InjectionKey<{ color: string }> = Symbol('heroui-color-swatch-picker-item')
