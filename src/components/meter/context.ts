import type { ComputedRef, InjectionKey } from 'vue'

export interface RangeContext {
  slots: Record<string, () => string>
  percentage: number
  valueText: string
  isIndeterminate: boolean
}

/** One key per component so nested ones do not read each other's slots. */
export const meterKey: InjectionKey<ComputedRef<RangeContext>> = Symbol('heroui-meter')
export const progressBarKey: InjectionKey<ComputedRef<RangeContext>> = Symbol('heroui-progress-bar')
export const progressCircleKey: InjectionKey<ComputedRef<RangeContext>> = Symbol('heroui-progress-circle')
