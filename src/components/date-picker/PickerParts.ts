import type { Placement } from '../../utils/placement'
import { datePickerVariants, dateRangePickerVariants } from '@heroui/styles'
import { PopoverContent, PopoverPortal, PopoverTrigger } from 'reka-ui'
import { computed, defineComponent, h, mergeProps, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { overlayStyle, sideAlign } from '../../utils/placement'
import { IconCalendar } from '../icons'
import { surfaceKey } from '../surface/context'

// DatePicker and DateRangePicker share these parts; only the class/data-slot prefix differs.
function pickerParts(prefix: 'date-picker' | 'date-range-picker') {
  const slots = (prefix === 'date-picker' ? datePickerVariants : dateRangePickerVariants)()

  /** Opens the calendar; usually placed in the field group's Suffix. */
  const Trigger = defineComponent({
    name: prefix === 'date-picker' ? 'DatePickerTrigger' : 'DateRangePickerTrigger',
    setup: (_, { slots: children }) => () => h(PopoverTrigger, { asChild: true }, () =>
      h(Bridge, { 'as': 'button', 'aria-label': 'Calendar', 'data-slot': `${prefix}-trigger`, 'class': slots.trigger() }, children)),
  })

  const TriggerIndicator = defineComponent({
    name: prefix === 'date-picker' ? 'DatePickerTriggerIndicator' : 'DateRangePickerTriggerIndicator',
    setup: (_, { slots: children }) => () => h('span', { 'aria-hidden': 'true', 'data-slot': `${prefix}-trigger-indicator`, 'class': slots.triggerIndicator() }, children.default?.() ?? h(IconCalendar)),
  })

  /** Holds the Calendar / RangeCalendar. */
  const Popover = defineComponent({
    name: prefix === 'date-picker' ? 'DatePickerPopover' : 'DateRangePickerPopover',
    inheritAttrs: false,
    props: { placement: { type: String as () => Placement, default: 'bottom start' }, offset: { type: Number, default: 8 } },
    setup(props, { slots: children, attrs }) {
      const position = computed(() => sideAlign(props.placement))
      provide(surfaceKey, computed(() => 'default' as const))
      return () => h(PopoverPortal, null, () => h(PopoverContent, {
        asChild: true,
        side: position.value.side,
        align: position.value.align,
        sideOffset: props.offset,
        // the Calendar focuses its selected date itself (initial focus)
        onOpenAutoFocus: (event: Event) => event.preventDefault(),
      }, () => h(Bridge, mergeProps({ 'overlay': true, 'data-slot': `${prefix}-popover`, 'class': slots.popover(), 'style': overlayStyle('popover') }, attrs), children)))
    },
  })

  return { Trigger, TriggerIndicator, Popover }
}

export const datePickerParts = pickerParts('date-picker')
export const dateRangePickerParts = pickerParts('date-range-picker')
