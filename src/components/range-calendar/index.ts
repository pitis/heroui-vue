import { calendarParts } from '../calendar'
import RangeCalendarRoot from './RangeCalendar.vue'

export { rangeCalendarVariants } from '@heroui/styles'

const RangeCalendar = Object.assign(RangeCalendarRoot, { Root: RangeCalendarRoot, ...calendarParts })

const { Header: RangeCalendarHeader, Heading: RangeCalendarHeading, NavButton: RangeCalendarNavButton, Grid: RangeCalendarGrid, GridHeader: RangeCalendarGridHeader, GridBody: RangeCalendarGridBody, HeaderCell: RangeCalendarHeaderCell, Cell: RangeCalendarCell, CellIndicator: RangeCalendarCellIndicator } = calendarParts

export { RangeCalendar, RangeCalendarCell, RangeCalendarCellIndicator, RangeCalendarGrid, RangeCalendarGridBody, RangeCalendarGridHeader, RangeCalendarHeader, RangeCalendarHeaderCell, RangeCalendarHeading, RangeCalendarNavButton, RangeCalendarRoot }
