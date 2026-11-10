import type { InjectionKey } from 'vue'

/** Provided as a reactive object by the year grid. */
export interface YearGridContext {
  years: number[]
  activeYear: number
  selectedYear: number
  currentYear: number
  select: (year: number) => void
}

export const yearGridKey: InjectionKey<YearGridContext> = Symbol('heroui-year-grid')
