import type { InjectionKey, ShallowRef } from 'vue'
import { descriptionVariants } from '@heroui/styles'
import { DialogDescription } from 'reka-ui'
import { computed, defineComponent, h, inject, onBeforeUnmount, onMounted, provide, shallowRef } from 'vue'

const descriptionCountKey: InjectionKey<ShallowRef<number>> = Symbol('heroui-dialog-description')

/**
 * For a dialog's content part (Modal.Dialog, Drawer.Dialog, Sheet.Dialog): attrs for Reka's DialogContent.
 * With no Description part inside, `aria-describedby` is switched off, as Reka asks (it warns otherwise);
 * with one, nothing is set and Reka points it at the description.
 */
export function useDialogDescription() {
  const count = shallowRef(0)
  provide(descriptionCountKey, count)
  return computed(() => (count.value ? {} : { 'aria-describedby': undefined }))
}

/**
 * The dialog's accessible description, read with its heading when it opens. Vue-only: HeroUI's React
 * dialogs have no such part. Styled as HeroUI's Description; `slot` gives its data-slot.
 */
export function dialogDescription(name: string, slot: () => string) {
  return defineComponent({
    name,
    setup(_, { slots }) {
      const count = inject(descriptionCountKey, undefined)
      const dataSlot = slot()
      onMounted(() => count && count.value++)
      onBeforeUnmount(() => count && count.value--)
      return () => h(DialogDescription, { 'data-slot': dataSlot, 'class': descriptionVariants() }, slots)
    },
  })
}
