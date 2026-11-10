import type { AlertVariants } from '@heroui/styles'
import type { ComputedRef, InjectionKey } from 'vue'

export const alertStatusKey: InjectionKey<ComputedRef<AlertVariants['status']>> = Symbol('heroui-alert-status')
