import type { InjectionKey } from 'vue'

export type SheetPlacement = 'top' | 'bottom' | 'left' | 'right'

/** Provided as a reactive object. */
export interface SheetContext {
  open: boolean
  placement: SheetPlacement
  isDetached: boolean
  isDismissable: boolean
  /** The Sheet.Content element, which Sheet.Handle drags. */
  content: HTMLElement | null
  close: () => void
}

export const sheetKey: InjectionKey<SheetContext> = Symbol('heroui-sheet')
