import type { searchFieldVariants } from '@heroui/styles'
import type { InjectionKey } from 'vue'

/** Provided as a reactive object, so `value` and `slots` are plain (unwrapped) here. */
export interface SearchFieldContext {
  value: string
  slots: ReturnType<typeof searchFieldVariants>
  clear: () => void
  submit: () => void
  /** Inside Autocomplete.Filter (in a Select popover). */
  inFilter: boolean
}

export const searchFieldKey: InjectionKey<SearchFieldContext> = Symbol('heroui-search-field')
