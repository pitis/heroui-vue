import type { InjectionKey } from 'vue'

/** Default orientation for Separators inside a container (a horizontal Toolbar wants vertical separators). */
export const separatorOrientationKey: InjectionKey<() => 'horizontal' | 'vertical'> = Symbol('heroui-separator-orientation')
