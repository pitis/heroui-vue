import { tableVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import TableRoot from './Table.vue'
import TableColumn from './TableColumn.vue'
import TableContent from './TableContent.vue'
import TableHeader from './TableHeader.vue'
import TableLoadMore from './TableLoadMore.vue'
import TableSortableColumnHeader from './TableSortableColumnHeader.vue'

export { tableVariants }
export type { SortDescriptor } from './context'

const slots = tableVariants()
const TableScrollContainer = part('TableScrollContainer', 'div', 'table-scroll-container', slots.scrollContainer())
const TableBody = part('TableBody', 'tbody', 'table-body', slots.body())
const TableRow = part('TableRow', 'tr', 'table-row', slots.row())
const TableCell = part('TableCell', 'td', 'table-cell', slots.cell())
const TableFooter = part('TableFooter', 'div', 'table-footer', slots.footer())
const TableLoadMoreContent = part('TableLoadMoreContent', 'div', 'table-load-more-content', slots.loadMoreContent())

const Table = Object.assign(TableRoot, {
  Root: TableRoot,
  ScrollContainer: TableScrollContainer,
  Content: TableContent,
  Header: TableHeader,
  Column: TableColumn,
  SortableColumnHeader: TableSortableColumnHeader,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  Footer: TableFooter,
  LoadMore: TableLoadMore,
  LoadMoreContent: TableLoadMoreContent,
})

export { Table, TableBody, TableCell, TableColumn, TableContent, TableFooter, TableHeader, TableLoadMore as TableLoadMoreItem, TableLoadMoreContent, TableRoot, TableRow, TableScrollContainer, TableSortableColumnHeader }
