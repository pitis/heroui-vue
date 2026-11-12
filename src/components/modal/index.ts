import ModalRoot from './Modal.vue'
import ModalBackdrop from './ModalBackdrop.vue'
import ModalBody from './ModalBody.vue'
import ModalCloseTrigger from './ModalCloseTrigger.vue'
import ModalContainer from './ModalContainer.vue'
import ModalDialog from './ModalDialog.vue'
import ModalHeading from './ModalHeading.vue'
import { inject } from 'vue'
import { dialogDescription } from '../../utils/dialog-description'
import { modalKey } from './context'
import { modalPart } from './ModalPart'
import ModalTrigger from './ModalTrigger.vue'

export { modalVariants } from '@heroui/styles'

const ModalHeader = modalPart('ModalHeader', 'header')
const ModalFooter = modalPart('ModalFooter', 'footer')
const ModalIcon = modalPart('ModalIcon', 'icon')
const ModalDescription = dialogDescription('ModalDescription', () => `${inject(modalKey)!.look.prefix}-description`)

const Modal = Object.assign(ModalRoot, {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Backdrop: ModalBackdrop,
  Container: ModalContainer,
  Dialog: ModalDialog,
  Header: ModalHeader,
  Icon: ModalIcon,
  Heading: ModalHeading,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  CloseTrigger: ModalCloseTrigger,
})

export { Modal, ModalBackdrop, ModalBody, ModalCloseTrigger, ModalContainer, ModalDescription, ModalDialog, ModalFooter, ModalHeader, ModalHeading, ModalIcon, ModalRoot, ModalTrigger }
