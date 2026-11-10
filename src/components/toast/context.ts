import type { toastVariants } from '@heroui/styles'
import type { InjectionKey } from 'vue'
import type { QueuedToast, ToastQueue } from './queue'

export type ToastPlacement = 'top' | 'top start' | 'top end' | 'bottom' | 'bottom start' | 'bottom end'

/** Provided as a reactive object by Toast.Provider. */
export interface ToastRegionContext {
  queue: ToastQueue
  placement: ToastPlacement
  gap: number
  scaleFactor: number
  isExpanded: boolean
  heights: Record<string, number>
}

export const toastRegionKey: InjectionKey<ToastRegionContext> = Symbol('heroui-toast-region')
/** The toast a part belongs to, for Toast.CloseButton. */
export const toastItemKey: InjectionKey<{ toast: QueuedToast, slots: ReturnType<typeof toastVariants> }> = Symbol('heroui-toast')
