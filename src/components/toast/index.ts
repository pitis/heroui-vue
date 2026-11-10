import ToastRoot from './Toast.vue'
import ToastCloseButton from './ToastCloseButton.vue'
import ToastIndicator from './ToastIndicator.vue'
import { ToastActionButton, ToastContent, ToastDescription, ToastTitle } from './ToastParts'
import ToastProvider from './ToastProvider.vue'
import { ToastQueue } from './queue'

export { toastVariants } from '@heroui/styles'
export type { ToastPlacement } from './context'
export { createToastFunction, DEFAULT_EXIT_DURATION, DEFAULT_GAP, DEFAULT_MAX_VISIBLE_TOAST, DEFAULT_TOAST_TIMEOUT, type QueuedToast, type Renderable, toast, type ToastContentValue, type ToastOptions, toastQueue } from './queue'

const Toast = Object.assign(ToastRoot, {
  Provider: ToastProvider,
  Indicator: ToastIndicator,
  Content: ToastContent,
  Title: ToastTitle,
  Description: ToastDescription,
  ActionButton: ToastActionButton,
  CloseButton: ToastCloseButton,
  Queue: ToastQueue,
})

export { Toast, ToastActionButton, ToastCloseButton, ToastContent, ToastDescription, ToastIndicator, ToastProvider, ToastQueue, ToastTitle }
