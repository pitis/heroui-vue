import { CalendarGrid as RekaCalendarGrid, CalendarGridBody as RekaCalendarGridBody, CalendarGridHead as RekaCalendarGridHead, CalendarGridRow as RekaCalendarGridRow, CalendarHeadCell as RekaCalendarHeadCell, CalendarHeading as RekaCalendarHeading, CalendarNext as RekaCalendarNext, CalendarPrev as RekaCalendarPrev, RangeCalendarGrid as RekaRangeCalendarGrid, RangeCalendarGridBody as RekaRangeCalendarGridBody, RangeCalendarGridHead as RekaRangeCalendarGridHead, RangeCalendarGridRow as RekaRangeCalendarGridRow, RangeCalendarHeadCell as RekaRangeCalendarHeadCell, RangeCalendarHeading as RekaRangeCalendarHeading, RangeCalendarNext as RekaRangeCalendarNext, RangeCalendarPrev as RekaRangeCalendarPrev } from 'reka-ui'
import { computed, defineComponent, h, inject, provide } from 'vue'
import { IconChevronLeft, IconChevronRight } from '../icons'
import CalendarCell from './CalendarCell.vue'
import { calendarKey, calendarMonthKey } from './context'

// Calendar and RangeCalendar share these parts; each picks the Reka primitive and classes of its root.
const reka = {
  calendar: { Heading: RekaCalendarHeading, Prev: RekaCalendarPrev, Next: RekaCalendarNext, Grid: RekaCalendarGrid, Head: RekaCalendarGridHead, Body: RekaCalendarGridBody, Row: RekaCalendarGridRow, HeadCell: RekaCalendarHeadCell },
  range: { Heading: RekaRangeCalendarHeading, Prev: RekaRangeCalendarPrev, Next: RekaRangeCalendarNext, Grid: RekaRangeCalendarGrid, Head: RekaRangeCalendarGridHead, Body: RekaRangeCalendarGridBody, Row: RekaRangeCalendarGridRow, HeadCell: RekaRangeCalendarHeadCell },
}

export const CalendarHeader = defineComponent({
  name: 'CalendarHeader',
  setup(_, { slots }) {
    const ctx = inject(calendarKey)!
    return () => h('div', { 'data-slot': `${ctx.prefix}-header`, 'class': ctx.slots.header() }, slots.default?.())
  },
})

/** The visible month and year as text. */
export const CalendarHeading = defineComponent({
  name: 'CalendarHeading',
  setup() {
    const ctx = inject(calendarKey)!
    return () => h(reka[ctx.kind].Heading, { 'data-slot': `${ctx.prefix}-heading`, 'class': ctx.slots.heading() })
  },
})

/** `slot="previous"` or `slot="next"` (HeroUI's naming). */
export const CalendarNavButton = defineComponent({
  name: 'CalendarNavButton',
  props: { slot: { type: String as () => 'previous' | 'next', required: true } },
  setup(props, { slots }) {
    const ctx = inject(calendarKey)!
    return () => h(
      props.slot === 'previous' ? reka[ctx.kind].Prev : reka[ctx.kind].Next,
      { 'data-slot': `${ctx.prefix}-nav-button`, 'class': ctx.slots.navButton() },
      () => slots.default?.() ?? h(props.slot === 'previous' ? IconChevronLeft : IconChevronRight, { 'data-slot': `${ctx.prefix}-nav-button-icon`, 'class': ctx.slots.navButtonIcon() }),
    )
  },
})

/** The month table. `offset` picks a later month when several are shown. */
export const CalendarGridPart = defineComponent({
  name: 'CalendarGrid',
  props: { offset: { type: Number, default: 0 } },
  setup(props, { slots }) {
    const ctx = inject(calendarKey)!
    const month = computed(() => ctx.grid[props.offset])
    provide(calendarMonthKey, () => month.value?.value)
    return () => h(reka[ctx.kind].Grid, { 'data-slot': `${ctx.prefix}-grid`, 'class': ctx.slots.grid() }, () => slots.default?.())
  },
})

/** Weekday row; slot props `{ day }` render each header cell (default: Calendar.HeaderCell). */
export const CalendarGridHeader = defineComponent({
  name: 'CalendarGridHeader',
  setup(_, { slots }) {
    const ctx = inject(calendarKey)!
    const { Head, Row } = reka[ctx.kind]
    return () => h(Head, { 'data-slot': `${ctx.prefix}-grid-header`, 'class': ctx.slots.gridHeader() }, () =>
      h(Row, null, () => ctx.weekDays.map(day => slots.default?.({ day }) ?? h(CalendarHeaderCell, { key: day }, () => day))))
  },
})

export const CalendarHeaderCell = defineComponent({
  name: 'CalendarHeaderCell',
  setup(_, { slots }) {
    const ctx = inject(calendarKey)!
    return () => h(reka[ctx.kind].HeadCell, { 'data-slot': `${ctx.prefix}-header-cell`, 'class': ctx.slots.headerCell() }, () => slots.default?.())
  },
})

/** Week rows; slot props `{ date }` render each day (default: Calendar.Cell). */
export const CalendarGridBody = defineComponent({
  name: 'CalendarGridBody',
  setup(_, { slots }) {
    const ctx = inject(calendarKey)!
    const month = inject(calendarMonthKey)!
    const { Body, Row } = reka[ctx.kind]
    return () => {
      const rows = ctx.grid.find(m => m.value.compare(month()!) === 0)?.rows ?? []
      return h(Body, { 'data-slot': `${ctx.prefix}-grid-body`, 'class': ctx.slots.gridBody() }, () => rows.map((week, i) =>
        h(Row, { key: i, class: ctx.slots.gridRow() }, () => week.map(date => slots.default?.({ date }) ?? h(CalendarCell, { key: date.toString(), date })))))
    }
  },
})

/** A small dot under the date (e.g. "has events"). */
export const CalendarCellIndicator = defineComponent({
  name: 'CalendarCellIndicator',
  setup() {
    const ctx = inject(calendarKey)!
    return () => h('span', { 'aria-hidden': 'true', 'data-slot': `${ctx.prefix}-cell-indicator`, 'class': ctx.slots.cellIndicator() })
  },
})
