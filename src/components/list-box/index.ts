import { ListBoxItemIndicator, ListBoxItemRoot } from '../list-box-item'
import { ListBoxSectionRoot } from '../list-box-section'
import ListBoxRoot from './ListBox.vue'

export { listboxVariants } from '@heroui/styles'
export { type CollectionKind, collectionKindKey } from './context'

const ListBox = Object.assign(ListBoxRoot, {
  Root: ListBoxRoot,
  Item: ListBoxItemRoot,
  ItemIndicator: ListBoxItemIndicator,
  Section: ListBoxSectionRoot,
})

export { ListBox, ListBoxRoot }
