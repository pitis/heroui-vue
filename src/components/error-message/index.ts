import { errorMessageVariants } from '@heroui/styles'
import { part } from '../../utils/part'

export { errorMessageVariants }

const ErrorMessageRoot = part('ErrorMessage', 'span', 'error-message', errorMessageVariants())

const ErrorMessage = Object.assign(ErrorMessageRoot, { Root: ErrorMessageRoot })

export { ErrorMessage, ErrorMessageRoot }
