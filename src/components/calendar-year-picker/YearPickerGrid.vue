<script setup lang="ts">
import { useStrings } from '../../utils/strings'
import { calendarYearPickerVariants } from '@heroui/styles'
import { computed, inject, nextTick, onMounted, provide, reactive, shallowRef, useTemplateRef, watch } from 'vue'
import { calendarKey } from '../calendar/context'
import { yearGridKey } from './context'

const strings = useStrings()

// Overlays the day grid while open; choosing a year moves the calendar to that year.
const ctx = inject(calendarKey)!
const el = useTemplateRef<HTMLElement>('el')
const years = computed(() => Array.from({ length: ctx.maxValue.year - ctx.minValue.year + 1 }, (_, i) => ctx.minValue.year + i))
const activeYear = shallowRef(ctx.placeholder.year)

function focusYear(year: number) {
  activeYear.value = year
  el.value?.querySelector<HTMLElement>(`[data-year="${year}"]`)?.focus()
}

// cover exactly the day grid's box, as React does (also while closed, so the long year list never overflows)
function fitToDayGrid() {
  const grid = el.value?.parentElement?.querySelector<HTMLElement>(`[data-slot="${ctx.prefix}-grid"]`)
  if (grid && el.value) {
    el.value.style.top = `${grid.offsetTop}px`
    el.value.style.height = `${grid.offsetHeight}px`
  }
}
onMounted(fitToDayGrid)

watch(() => ctx.isYearPickerOpen, async (open) => {
  if (!open)
    return
  await nextTick()
  fitToDayGrid()
  requestAnimationFrame(() => focusYear(years.value.includes(ctx.placeholder.year) ? ctx.placeholder.year : years.value[0]!))
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    ctx.isYearPickerOpen = false
    return
  }
  const index = years.value.indexOf(activeYear.value)
  const step = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 3, ArrowUp: -3 }[event.key]
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? years.value.length - 1 : step != null ? Math.min(years.value.length - 1, Math.max(0, index + step)) : -1
  if (next !== -1 && index !== -1) {
    event.preventDefault()
    focusYear(years.value[next]!)
  }
}

provide(yearGridKey, reactive({
  years,
  activeYear,
  selectedYear: computed(() => ctx.placeholder.year),
  currentYear: new Date().getFullYear(),
  select(year: number) {
    ctx.placeholder = ctx.placeholder.set({ year })
    ctx.isYearPickerOpen = false
  },
}))
</script>

<template>
  <div
    ref="el"
    role="listbox"
    :aria-label="strings.year"
    tabindex="-1"
    data-slot="calendar-year-picker-grid"
    :class="calendarYearPickerVariants().yearGrid()"
    :aria-hidden="!ctx.isYearPickerOpen"
    :data-open="ctx.isYearPickerOpen || undefined"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
