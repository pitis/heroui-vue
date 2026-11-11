/** Folds case and accents, so "bucuresti" finds "București" (React Aria's `useFilter({ sensitivity: 'base' })`). */
const fold = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase()

/** Autocomplete.Filter's default: the item's text contains what was typed, ignoring case and accents. */
export function contains(textValue: string, inputValue: string): boolean {
  return fold(textValue).includes(fold(inputValue))
}
