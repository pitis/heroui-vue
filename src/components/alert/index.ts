import { alertVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import AlertRoot from './Alert.vue'
import AlertIndicator from './AlertIndicator.vue'

export { alertVariants }

const slots = alertVariants()
const AlertContent = part('AlertContent', 'div', 'alert-content', slots.content())
const AlertTitle = part('AlertTitle', 'p', 'alert-title', slots.title())
const AlertDescription = part('AlertDescription', 'span', 'alert-description', slots.description())

const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Indicator: AlertIndicator,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
})

export { Alert, AlertContent, AlertDescription, AlertIndicator, AlertRoot, AlertTitle }
