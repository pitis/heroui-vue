import type { InjectionKey, ComputedRef } from 'vue'
import type { RangeContext } from './context'
import { defineComponent, h, inject } from 'vue'

/** Meter/ProgressBar part reading its class from the root's slots; `fill` also sets the width. */
export function rangePart(
  key: InjectionKey<ComputedRef<RangeContext>>,
  name: string,
  as: string,
  slot: string,
  variantSlot: string,
  kind: 'output' | 'fill' | 'plain',
) {
  return defineComponent({
    name,
    setup(_, { slots: vnodes }) {
      const ctx = inject(key)!
      return () => {
        const { slots, percentage, valueText, isIndeterminate } = ctx.value
        return h(as, {
          'class': slots[variantSlot]!(),
          'data-slot': slot,
          'style': kind === 'fill' && !isIndeterminate ? { width: `${percentage}%` } : undefined,
        }, vnodes.default?.() ?? (kind === 'output' ? valueText : undefined))
      }
    },
  })
}
