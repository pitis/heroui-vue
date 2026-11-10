import { drawerVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import DrawerRoot from './Drawer.vue'
import DrawerBackdrop from './DrawerBackdrop.vue'
import DrawerCloseTrigger from './DrawerCloseTrigger.vue'
import DrawerContent from './DrawerContent.vue'
import DrawerDialog from './DrawerDialog.vue'
import DrawerHandle from './DrawerHandle.vue'
import DrawerHeading from './DrawerHeading.vue'
import DrawerTrigger from './DrawerTrigger.vue'

export { drawerVariants }

const slots = drawerVariants()
const DrawerHeader = part('DrawerHeader', 'div', 'drawer-header', slots.header())
// pan-y: the body scrolls instead of starting a drag
const DrawerBody = part('DrawerBody', 'div', 'drawer-body', slots.body(), { style: { touchAction: 'pan-y' } })
const DrawerFooter = part('DrawerFooter', 'div', 'drawer-footer', slots.footer())

const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Backdrop: DrawerBackdrop,
  Content: DrawerContent,
  Dialog: DrawerDialog,
  Header: DrawerHeader,
  Heading: DrawerHeading,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Handle: DrawerHandle,
  CloseTrigger: DrawerCloseTrigger,
})

export { Drawer, DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerDialog, DrawerFooter, DrawerHandle, DrawerHeader, DrawerHeading, DrawerRoot, DrawerTrigger }
