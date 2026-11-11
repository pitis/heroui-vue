import type { Component, ComputedRef, InjectionKey } from 'vue'

/**
 * Which Reka collection the ListBox parts render. Standalone it is Reka's Listbox; inside Select.Popover,
 * ComboBox.Popover or Autocomplete the enclosing part provides its own kind, so `<ListBox>` markup works everywhere.
 */
export type CollectionKind = 'listbox' | 'select' | 'combobox'

export const collectionKindKey: InjectionKey<CollectionKind> = Symbol('heroui-collection-kind')
/** Whether the enclosing picker allows multiple selection (for aria-multiselectable on the list). */
export const collectionMultipleKey: InjectionKey<ComputedRef<boolean>> = Symbol('heroui-collection-multiple')
/** Selected state of the enclosing ListBox.Item, for its ItemIndicator. */
export const listBoxItemSelectedKey: InjectionKey<ComputedRef<boolean>> = Symbol('heroui-list-box-item-selected')
/** The Reka group label component for the enclosing section; Header renders through it. */
export const sectionLabelKey: InjectionKey<Component> = Symbol('heroui-section-label')
/** id → text of the items seen so far, so a ComboBox input can show the selected item's text. */
export const itemTextKey: InjectionKey<Map<string, string>> = Symbol('heroui-item-text')

/** status-disabled from @heroui/styles, inline: the item CSS only matches [data-disabled="true"], which Reka must keep as "". */
// shortcut: duplicates the status-disabled utility; drop it if @heroui/styles also matches [data-disabled] on items
export const DISABLED_ITEM_STYLE = { opacity: 'var(--disabled-opacity)', cursor: 'var(--cursor-disabled)', pointerEvents: 'none' } as const

/** Set by Autocomplete.Filter (provided reactive): items whose text does not match `query` are hidden. */
export const collectionFilterKey: InjectionKey<{
  query: string
  filter: (textValue: string, inputValue: string) => boolean
}> = Symbol('heroui-collection-filter')
