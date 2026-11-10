import { inputOTPVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import InputOTPRoot from './InputOTP.vue'
import InputOTPSlot from './InputOTPSlot.vue'

export { inputOTPVariants }
export { REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from './context'

const slots = inputOTPVariants()
const InputOTPGroup = part('InputOTPGroup', 'div', 'input-otp-group', slots.group())
const InputOTPSeparator = part('InputOTPSeparator', 'div', 'input-otp-separator', slots.separator(), { 'aria-hidden': 'true' })

const InputOTP = Object.assign(InputOTPRoot, { Root: InputOTPRoot, Group: InputOTPGroup, Slot: InputOTPSlot, Separator: InputOTPSeparator })

export { InputOTP, InputOTPGroup, InputOTPRoot, InputOTPSeparator, InputOTPSlot }
