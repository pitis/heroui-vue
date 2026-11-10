import { CalendarYearPickerCell, CalendarYearPickerGrid, CalendarYearPickerGridBody, CalendarYearPickerTrigger, CalendarYearPickerTriggerHeading, CalendarYearPickerTriggerIndicator } from '../calendar-year-picker'
import CalendarRoot from './Calendar.vue'
import CalendarCell from './CalendarCell.vue'
import { CalendarCellIndicator, CalendarGridPart as CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeader, CalendarHeaderCell, CalendarHeading, CalendarNavButton } from './CalendarParts'

export { calendarVariants } from '@heroui/styles'

/** The parts shared by Calendar and RangeCalendar. */
export const calendarParts = {
  Header: CalendarHeader,
  Heading: CalendarHeading,
  NavButton: CalendarNavButton,
  Grid: CalendarGrid,
  GridHeader: CalendarGridHeader,
  GridBody: CalendarGridBody,
  HeaderCell: CalendarHeaderCell,
  Cell: CalendarCell,
  CellIndicator: CalendarCellIndicator,
  YearPickerTrigger: CalendarYearPickerTrigger,
  YearPickerTriggerHeading: CalendarYearPickerTriggerHeading,
  YearPickerTriggerIndicator: CalendarYearPickerTriggerIndicator,
  YearPickerGrid: CalendarYearPickerGrid,
  YearPickerGridBody: CalendarYearPickerGridBody,
  YearPickerCell: CalendarYearPickerCell,
}

const Calendar = Object.assign(CalendarRoot, { Root: CalendarRoot, ...calendarParts })

export { Calendar, CalendarCell, CalendarCellIndicator, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeader, CalendarHeaderCell, CalendarHeading, CalendarNavButton, CalendarRoot }
