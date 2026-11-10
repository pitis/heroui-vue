import { defineComponent, h, inject } from 'vue'
import { Button } from '../button'
import { toastItemKey } from './context'

function toastPart(name: string, as: string, slot: string, cls: 'content' | 'title' | 'description') {
  return defineComponent({
    name,
    setup(_, { slots }) {
      const item = inject(toastItemKey)!
      return () => h(as, { 'data-slot': slot, 'class': item.slots[cls]() }, slots.default?.())
    },
  })
}

export const ToastContent = toastPart('ToastContent', 'div', 'toast-content', 'content')
export const ToastTitle = toastPart('ToastTitle', 'div', 'toast-title', 'title')
export const ToastDescription = toastPart('ToastDescription', 'div', 'toast-description', 'description')

/** A Button styled for the toast; all Button props apply. */
export const ToastActionButton = defineComponent({
  name: 'ToastActionButton',
  setup(_, { slots }) {
    const item = inject(toastItemKey)!
    return () => h(Button, { 'data-slot': 'toast-action-button', 'class': item.slots.action() }, slots)
  },
})
