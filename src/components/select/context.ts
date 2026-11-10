import type { selectVariants } from '@heroui/styles'
import type { InjectionKey } from 'vue'

/** Provided as a reactive object by Select. */
export interface SelectContext {
  slots: ReturnType<typeof selectVariants>
  /** data-slot prefix: 'select', or 'autocomplete' when Autocomplete reuses these parts. */
  prefix: 'select' | 'autocomplete'
  open: boolean
  isEmpty: boolean
  isDisabled?: boolean
  placeholder: string
  clear: () => void
  /** Select.ClearButton registers itself so Backspace/Delete on the trigger clears too. */
  clearButtons: number
}

export const selectKey: InjectionKey<SelectContext> = Symbol('heroui-select')
