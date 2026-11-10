import { sheetVariants } from '@heroui/styles'
import { DialogClose, DialogTrigger } from 'reka-ui'
import { defineComponent, h } from 'vue'
import { part } from '../../utils/part'
import SheetRoot from './Sheet.vue'
import SheetBackdrop from './SheetBackdrop.vue'
import SheetCloseTrigger from './SheetCloseTrigger.vue'
import SheetContent from './SheetContent.vue'
import SheetDialog from './SheetDialog.vue'
import SheetHandle from './SheetHandle.vue'
import SheetHeading from './SheetHeading.vue'

export { sheetVariants }
export type { SheetPlacement } from './context'

const slots = sheetVariants()
const SheetHeader = part('SheetHeader', 'div', 'sheet-header', slots.header())
const SheetBody = part('SheetBody', 'div', 'sheet-body', slots.body())
const SheetFooter = part('SheetFooter', 'div', 'sheet-footer', slots.footer())

/** Makes its single child (e.g. a Button) open the sheet. */
const SheetTrigger = defineComponent({ name: 'SheetTrigger', setup: (_, { slots }) => () => h(DialogTrigger, { asChild: true }, slots) })
/** Makes its single child (e.g. a Button) close the sheet. */
const SheetClose = defineComponent({ name: 'SheetClose', setup: (_, { slots }) => () => h(DialogClose, { asChild: true }, slots) })
// shortcut: no stacking/scale-back effect for nested sheets; a nested one is a plain Sheet
const SheetNestedRoot = SheetRoot

const Sheet = Object.assign(SheetRoot, {
  Root: SheetRoot,
  NestedRoot: SheetNestedRoot,
  Trigger: SheetTrigger,
  Close: SheetClose,
  Backdrop: SheetBackdrop,
  Content: SheetContent,
  Dialog: SheetDialog,
  Header: SheetHeader,
  Heading: SheetHeading,
  Body: SheetBody,
  Footer: SheetFooter,
  Handle: SheetHandle,
  CloseTrigger: SheetCloseTrigger,
})

export { Sheet, SheetBackdrop, SheetBody, SheetClose, SheetCloseTrigger, SheetContent, SheetDialog, SheetFooter, SheetHandle, SheetHeader, SheetHeading, SheetNestedRoot, SheetRoot, SheetTrigger }
