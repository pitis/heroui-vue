import ModalRoot from './Modal.vue'
import ModalBackdrop from './ModalBackdrop.vue'
import ModalBody from './ModalBody.vue'
import ModalCloseTrigger from './ModalCloseTrigger.vue'
import ModalContainer from './ModalContainer.vue'
import ModalDialog from './ModalDialog.vue'
import ModalHeading from './ModalHeading.vue'
import { modalPart } from './ModalPart'
import ModalTrigger from './ModalTrigger.vue'

export { modalVariants } from '@heroui/styles'

const ModalHeader = modalPart('ModalHeader', 'header')
const ModalFooter = modalPart('ModalFooter', 'footer')
const ModalIcon = modalPart('ModalIcon', 'icon')

const Modal = Object.assign(ModalRoot, {
  Root: ModalRoot,
  Trigger: ModalTrigger,
  Backdrop: ModalBackdrop,
  Container: ModalContainer,
  Dialog: ModalDialog,
  Header: ModalHeader,
  Icon: ModalIcon,
  Heading: ModalHeading,
  Body: ModalBody,
  Footer: ModalFooter,
  CloseTrigger: ModalCloseTrigger,
})

export { Modal, ModalBackdrop, ModalBody, ModalCloseTrigger, ModalContainer, ModalDialog, ModalFooter, ModalHeader, ModalHeading, ModalIcon, ModalRoot, ModalTrigger }
