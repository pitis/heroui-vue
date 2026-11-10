import { defineComponent, Fragment, h, inject } from 'vue'
import { yearGridKey } from './context'
import YearPickerCell from './YearPickerCell.vue'

/** One cell per year; slot props `{ year }` customize it (default: YearPickerCell). */
export default defineComponent({
  name: 'CalendarYearPickerGridBody',
  setup(_, { slots }) {
    const grid = inject(yearGridKey)!
    return () => h(Fragment, grid.years.map(year => slots.default?.({ year }) ?? h(YearPickerCell, { key: year, year })))
  },
})
