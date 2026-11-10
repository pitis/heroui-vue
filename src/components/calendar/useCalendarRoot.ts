import type { DateValue } from '@internationalized/date'
import type { CalendarContext } from './context'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { computed, provide, reactive, shallowRef } from 'vue'
import { calendarKey } from './context'

export const WEEK_START = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 } as const

/** Context shared by Calendar and RangeCalendar; the root's scoped slot fills `grid`, `weekDays` and `locale`. */
export function useCalendarRoot(
  kind: CalendarContext['kind'],
  slots: CalendarContext['slots'],
  props: { minValue?: DateValue, maxValue?: DateValue },
  initial: DateValue | undefined,
) {
  // the month in view: controlled here so the year picker can move it
  const placeholder = shallowRef<DateValue>(initial ?? today(getLocalTimeZone()))
  const ctx = reactive({
    kind,
    prefix: kind === 'range' ? 'range-calendar' : 'calendar',
    slots,
    grid: [],
    weekDays: [],
    locale: 'en-US',
    placeholder,
    // React's defaults: 1900–2099, which also bounds the year picker
    minValue: computed(() => props.minValue ?? new CalendarDate(1900, 1, 1)),
    maxValue: computed(() => props.maxValue ?? new CalendarDate(2099, 12, 31)),
    isYearPickerOpen: false,
  }) as unknown as CalendarContext
  provide(calendarKey, ctx)
  return { ctx, placeholder }
}
