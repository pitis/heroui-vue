import type { PropType } from 'vue'
import type { DateFieldContext } from './context'
import { defineComponent, inject, watchEffect } from 'vue'
import { dateFieldKey } from './context'

/** Rendered inside Reka's field root slot: copies its segments into the field context. */
export default defineComponent({
  name: 'DateSegmentsScope',
  props: { segments: { type: [Array, Object] as PropType<DateFieldContext['segments']>, required: true } },
  setup(props, { slots }) {
    const ctx = inject(dateFieldKey)!
    watchEffect(() => (ctx.segments = props.segments))
    return () => slots.default?.()
  },
})
