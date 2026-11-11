import { Modal } from '../modal'
import AlertDialogRoot from './AlertDialog.vue'
import AlertDialogIcon from './AlertDialogIcon.vue'

export { alertDialogVariants } from '@heroui/styles'

// the other parts are Modal's; they take the alert-dialog classes from the root
const { Trigger: AlertDialogTrigger, Backdrop: AlertDialogBackdrop, Container: AlertDialogContainer, Dialog: AlertDialogDialog, Header: AlertDialogHeader, Heading: AlertDialogHeading, Description: AlertDialogDescription, Body: AlertDialogBody, Footer: AlertDialogFooter, CloseTrigger: AlertDialogCloseTrigger } = Modal

const AlertDialog = Object.assign(AlertDialogRoot, {
  Root: AlertDialogRoot,
  Trigger: AlertDialogTrigger,
  Backdrop: AlertDialogBackdrop,
  Container: AlertDialogContainer,
  Dialog: AlertDialogDialog,
  Header: AlertDialogHeader,
  Heading: AlertDialogHeading,
  Description: AlertDialogDescription,
  Body: AlertDialogBody,
  Footer: AlertDialogFooter,
  Icon: AlertDialogIcon,
  CloseTrigger: AlertDialogCloseTrigger,
})

export { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogCloseTrigger, AlertDialogContainer, AlertDialogDescription, AlertDialogDialog, AlertDialogFooter, AlertDialogHeader, AlertDialogHeading, AlertDialogIcon, AlertDialogRoot, AlertDialogTrigger }
