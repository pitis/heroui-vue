import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface SliderContext {
  values: ComputedRef<number[]>
  min: ComputedRef<number>
  max: ComputedRef<number>
  step: ComputedRef<number>
  orientation: ComputedRef<'horizontal' | 'vertical'>
  isDisabled: ComputedRef<boolean | undefined>
  format: ComputedRef<(value: number) => string>
  /** A pointer is down on the slider (React Aria's data-dragging). */
  isDragging: Ref<boolean>
}

export const sliderKey: InjectionKey<SliderContext> = Symbol('heroui-slider')

/** Position of `value` along the track, 0–100. */
export function percentOf(ctx: SliderContext, value: number) {
  const span = ctx.max.value - ctx.min.value
  return span ? (value - ctx.min.value) / span * 100 : 0
}

/** Start and end of the filled part, 0–100: from min for one thumb, between the thumbs for a range. */
export function fillRange(ctx: SliderContext) {
  const values = ctx.values.value
  const end = percentOf(ctx, values.at(-1) ?? ctx.min.value)
  return [values.length > 1 ? percentOf(ctx, values[0]!) : 0, end] as const
}
