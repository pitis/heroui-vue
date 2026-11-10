import type { Ref } from 'vue'
import type { DisclosureLook } from '../disclosure/context'
import { computed, provide } from 'vue'
import { disclosureGroupKey } from '../disclosure/context'

/** Expanded-keys state shared by DisclosureGroup and Accordion. */
export function useDisclosureGroup(
  props: { allowsMultipleExpanded?: boolean, isDisabled?: boolean, hideSeparator?: boolean },
  expandedKeys: Ref<string[]>,
  look?: DisclosureLook,
) {
  provide(disclosureGroupKey, {
    isExpanded: id => expandedKeys.value.includes(id),
    toggle(id) {
      const open = expandedKeys.value.includes(id)
      expandedKeys.value = open
        ? expandedKeys.value.filter(key => key !== id)
        : props.allowsMultipleExpanded ? [...expandedKeys.value, id] : [id]
    },
    isDisabled: computed(() => props.isDisabled),
    hideSeparator: computed(() => !!props.hideSeparator),
    look,
  })
}
