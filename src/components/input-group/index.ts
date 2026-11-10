import { inputGroupVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import InputGroupRoot from './InputGroup.vue'
import InputGroupInput from './InputGroupInput.vue'
import InputGroupTextArea from './InputGroupTextArea.vue'

export { inputGroupVariants }

const slots = inputGroupVariants()
const InputGroupPrefix = part('InputGroupPrefix', 'div', 'input-group-prefix', slots.prefix())
const InputGroupSuffix = part('InputGroupSuffix', 'div', 'input-group-suffix', slots.suffix())

const InputGroup = Object.assign(InputGroupRoot, {
  Root: InputGroupRoot,
  Input: InputGroupInput,
  TextArea: InputGroupTextArea,
  Prefix: InputGroupPrefix,
  Suffix: InputGroupSuffix,
})

export { InputGroup, InputGroupInput, InputGroupPrefix, InputGroupRoot, InputGroupSuffix, InputGroupTextArea }
