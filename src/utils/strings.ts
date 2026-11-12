import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

/**
 * The words heroui-vue writes itself: the labels of its icon-only controls and live regions, which
 * React Aria translates from the locale. English by default; an app in another language calls
 * `provideStrings` once near its root (any part may be left out).
 */
export interface HeroUIStrings {
  close: string
  closeNotification: string
  notifications: string
  clearSearch: string
  removeTag: string
  showSuggestions: string
  loading: string
  year: string
}

const DEFAULT_STRINGS: HeroUIStrings = {
  close: 'Close',
  closeNotification: 'Close notification',
  notifications: 'Notifications (Alt+T)',
  clearSearch: 'Clear search',
  removeTag: 'Remove tag',
  showSuggestions: 'Show suggestions',
  loading: 'Loading',
  year: 'Year',
}

const stringsKey: InjectionKey<HeroUIStrings> = Symbol('heroui-strings')

/** The strings for every heroui-vue part below this component; a nested call overrides only what it names. */
export function provideStrings(strings: Partial<HeroUIStrings>): void {
  provide(stringsKey, { ...useStrings(), ...strings })
}

export function useStrings(): HeroUIStrings {
  return inject(stringsKey, DEFAULT_STRINGS)
}
