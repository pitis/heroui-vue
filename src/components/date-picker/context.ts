import type { InjectionKey } from 'vue'

/** Provided by DatePicker / DateRangePicker: a Calendar inside binds to this value and closes the popover on pick. */
export interface DatePickerContext {
  kind: 'single' | 'range'
  get: () => unknown
  set: (value: unknown) => void
}

export const datePickerKey: InjectionKey<DatePickerContext> = Symbol('heroui-date-picker')
