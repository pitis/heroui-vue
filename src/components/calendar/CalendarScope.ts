import type { PropType } from 'vue'
import type { CalendarContext } from './context'
import { defineComponent, inject, watchEffect } from 'vue'
import { calendarKey } from './context'

/** Rendered inside the Reka root's scoped slot: copies its grid, weekdays and locale into the calendar context. */
export default defineComponent({
  name: 'CalendarScope',
  props: {
    grid: { type: Array as PropType<CalendarContext['grid']>, required: true },
    weekDays: { type: Array as PropType<string[]>, required: true },
    locale: { type: String, required: true },
  },
  setup(props, { slots }) {
    const ctx = inject(calendarKey)!
    watchEffect(() => {
      ctx.grid = props.grid
      ctx.weekDays = props.weekDays
      ctx.locale = props.locale
    })
    return () => slots.default?.()
  },
})
