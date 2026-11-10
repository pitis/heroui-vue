import type { SurfaceVariants } from '@heroui/styles'
import type { ComputedRef, InjectionKey } from 'vue'

/** The surface variant an element sits on, so controls inside can pick their "on-surface" colors. */
export const surfaceKey: InjectionKey<ComputedRef<SurfaceVariants['variant']>> = Symbol('heroui-surface')
