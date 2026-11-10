import type { Placement } from '../../utils/placement'
import { colorPickerVariants } from '@heroui/styles'
import { PopoverContent, PopoverPortal, PopoverTrigger } from 'reka-ui'
import { computed, defineComponent, h, mergeProps, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { overlayStyle, sideAlign } from '../../utils/placement'
import { surfaceKey } from '../surface/context'

const slots = colorPickerVariants()

/** Opens the popover; put a ColorSwatch and/or a Label inside. */
export const ColorPickerTrigger = defineComponent({
  name: 'ColorPickerTrigger',
  setup: (_, { slots: children }) => () => h(PopoverTrigger, { asChild: true }, () =>
    h(Bridge, { 'as': 'button', 'data-slot': 'color-picker-trigger', 'class': slots.trigger() }, children)),
})

export const ColorPickerPopover = defineComponent({
  name: 'ColorPickerPopover',
  inheritAttrs: false,
  props: { placement: { type: String as () => Placement, default: 'bottom left' }, offset: { type: Number, default: 8 } },
  setup(props, { slots: children, attrs }) {
    const position = computed(() => sideAlign(props.placement))
    provide(surfaceKey, computed(() => 'default' as const))
    return () => h(PopoverPortal, null, () => h(PopoverContent, { asChild: true, side: position.value.side, align: position.value.align, sideOffset: props.offset }, () =>
      h(Bridge, mergeProps({ 'overlay': true, 'data-slot': 'color-picker-popover', 'class': slots.popover(), 'style': overlayStyle('popover') }, attrs), children)))
  },
})
