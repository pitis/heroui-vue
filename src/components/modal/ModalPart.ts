import { defineComponent, h, inject } from 'vue'
import { modalKey } from './context'

/** A plain styled section (Header, Footer, Icon) whose class depends on Modal vs AlertDialog. */
export function modalPart(name: string, slot: 'header' | 'footer' | 'icon') {
  return defineComponent({
    name,
    setup(_, { slots }) {
      const { look } = inject(modalKey)!
      return () => h('div', { 'data-slot': `${look.prefix}-${slot}`, 'class': look.variants()[slot]() }, slots.default?.())
    },
  })
}
