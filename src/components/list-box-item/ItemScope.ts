import type { CollectionKind } from '../list-box/context'
import { injectListboxItemContext, injectSelectItemContext } from 'reka-ui'
import { computed, defineComponent, provide } from 'vue'
import { listBoxItemSelectedKey } from '../list-box/context'

/** Rendered inside the Reka item: re-provides its selected state for ListBox.ItemIndicator. */
export default defineComponent({
  name: 'ListBoxItemScope',
  props: { kind: { type: String as () => CollectionKind, required: true } },
  setup(props, { slots }) {
    const item = props.kind === 'select' ? injectSelectItemContext() : injectListboxItemContext()
    provide(listBoxItemSelectedKey, computed(() => item.isSelected.value))
    return () => slots.default?.()
  },
})
