import InputRoot from './Input.vue'

export { inputVariants } from '@heroui/styles'
export { inputVariantKey } from './context'

const Input = Object.assign(InputRoot, { Root: InputRoot })

export { Input, InputRoot }
export { comboboxInputKey } from './context'
