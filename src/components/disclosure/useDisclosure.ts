import type { Ref } from 'vue'
import type { DisclosureLook } from './context'
import { computed, inject, provide, useId } from 'vue'
import { disclosureGroupKey, disclosureKey } from './context'

/** State of one Disclosure / Accordion.Item: its own `expanded` model, or its group's when inside one. */
export function useDisclosure(options: { id?: string, isDisabled?: boolean }, expanded: Ref<boolean>, look: DisclosureLook) {
  const group = inject(disclosureGroupKey, undefined)
  const key = options.id ?? useId()
  const base = useId()
  const isExpanded = computed(() => (group ? group.isExpanded(key) : expanded.value))
  const isDisabled = computed(() => options.isDisabled || group?.isDisabled.value)
  provide(disclosureKey, {
    isExpanded,
    isDisabled,
    toggle: () => {
      if (isDisabled.value)
        return
      if (group)
        group.toggle(key)
      else
        expanded.value = !expanded.value
    },
    triggerId: `${base}-trigger`,
    panelId: `${base}-panel`,
    look,
  })
  return { isExpanded, isDisabled }
}
