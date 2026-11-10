import type { numberFieldVariants } from '@heroui/styles'
import type { ComputedRef, InjectionKey } from 'vue'

export const numberFieldKey: InjectionKey<ComputedRef<ReturnType<typeof numberFieldVariants>>> = Symbol('heroui-number-field')
