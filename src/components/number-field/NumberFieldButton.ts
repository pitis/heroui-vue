import { NumberFieldDecrement, NumberFieldIncrement } from 'reka-ui'
import { defineComponent, h, inject } from 'vue'
import { IconMinus, IconPlus } from '../icons'
import { numberFieldKey } from './context'

// `slot="increment"` / `"decrement"` is what the group's padding rules in @heroui/styles look for
function stepper(kind: 'increment' | 'decrement') {
  const [Reka, Icon, label] = kind === 'increment' ? [NumberFieldIncrement, IconPlus, 'Increase'] : [NumberFieldDecrement, IconMinus, 'Decrease']
  return defineComponent({
    name: kind === 'increment' ? 'NumberFieldIncrementButton' : 'NumberFieldDecrementButton',
    setup(_, { slots }) {
      const variants = inject(numberFieldKey)!
      return () => h(Reka, {
        'slot': kind,
        'aria-label': label,
        'data-slot': `number-field-${kind}-button`,
        'class': kind === 'increment' ? variants.value.incrementButton() : variants.value.decrementButton(),
      }, () => slots.default?.() ?? h(Icon, { 'data-slot': `number-field-${kind}-button-icon` }))
    },
  })
}

export const NumberFieldIncrementButton = stepper('increment')
export const NumberFieldDecrementButton = stepper('decrement')
