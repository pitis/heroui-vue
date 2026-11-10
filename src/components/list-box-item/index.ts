import ListBoxItemRoot from './ListBoxItem.vue'
import ListBoxItemIndicator from './ListBoxItemIndicator.vue'

export { listboxItemVariants } from '@heroui/styles'

const ListBoxItem = Object.assign(ListBoxItemRoot, { Root: ListBoxItemRoot, Indicator: ListBoxItemIndicator })

export { ListBoxItem, ListBoxItemIndicator, ListBoxItemRoot }
