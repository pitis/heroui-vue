import type { DateValue } from '@internationalized/date'
import type { InjectionKey } from 'vue'

type Slot = (props?: Record<string, unknown>) => string

/** Provided as a reactive object by Calendar and RangeCalendar; their parts are shared. */
export interface CalendarContext {
  kind: 'calendar' | 'range'
  /** 'calendar' or 'range-calendar': class and data-slot prefix. */
  prefix: string
  slots: Record<'header' | 'heading' | 'navButton' | 'navButtonIcon' | 'grid' | 'gridHeader' | 'gridBody' | 'gridRow' | 'headerCell' | 'cell' | 'cellIndicator', Slot>
  /** Months shown, from Reka (`{ value, rows: DateValue[][] }`). */
  grid: { value: DateValue, rows: DateValue[][] }[]
  weekDays: string[]
  locale: string
  /** The month in view; the year picker changes its year. */
  placeholder: DateValue
  minValue: DateValue
  maxValue: DateValue
  isYearPickerOpen: boolean
}

export const calendarKey: InjectionKey<CalendarContext> = Symbol('heroui-calendar')
/** The month a Calendar.Grid shows, for its cells. */
export const calendarMonthKey: InjectionKey<() => DateValue | undefined> = Symbol('heroui-calendar-month')
