import type { ModalVariants } from '@heroui/styles'
import type { ComputedRef, InjectionKey, Ref } from 'vue'

type Slot = (props?: Record<string, unknown>) => string
type Slots = Record<'backdrop' | 'container' | 'dialog' | 'header' | 'heading' | 'icon' | 'body' | 'footer' | 'closeTrigger' | 'trigger', Slot>

export interface ModalContext {
  open: Ref<boolean>
  /** Modal and AlertDialog share these parts; they differ in classes, data-slot prefix and dismiss defaults. */
  look: {
    prefix: 'modal' | 'alert-dialog'
    variants: (props?: Record<string, unknown>) => Slots
  }
}

/** Options set on Backdrop / Container that the Dialog and its parts need. */
export interface ModalLayout {
  isDismissable: boolean
  isKeyboardDismissDisabled: boolean
  placement: 'auto' | 'top' | 'center' | 'bottom'
  scroll?: ModalVariants['scroll']
  size?: ModalVariants['size']
}

export const modalKey: InjectionKey<ModalContext> = Symbol('heroui-modal')
export const modalLayoutKey: InjectionKey<ComputedRef<Partial<ModalLayout>>> = Symbol('heroui-modal-layout')
