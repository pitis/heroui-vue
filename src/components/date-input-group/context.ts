import type { InjectionKey } from 'vue'

export interface DateSegment { part: string, value: string }

/** Provided as a reactive object by DateField / TimeField (and the pickers' fields). */
export interface DateFieldContext {
  kind: 'date' | 'time' | 'range'
  /** From Reka's root: the editable parts in display order (per end, for a range). */
  segments: DateSegment[] | { start: DateSegment[], end: DateSegment[] }
  /** No value yet: segments show their placeholders. */
  isEmpty: boolean
}

export const dateFieldKey: InjectionKey<DateFieldContext> = Symbol('heroui-date-field')

/** Set by DatePicker / DateRangePicker: the field's group is what the calendar popover is positioned against. */
export const pickerAnchorKey: InjectionKey<true> = Symbol('heroui-picker-anchor')
