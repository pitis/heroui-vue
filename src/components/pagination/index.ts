import { paginationVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import PaginationRoot from './Pagination.vue'
import PaginationLink from './PaginationLink.vue'
import { PaginationNext, PaginationNextIcon, PaginationPrevious, PaginationPreviousIcon } from './PaginationNav'

export { paginationVariants }

const slots = paginationVariants()
const PaginationSummary = part('PaginationSummary', 'div', 'pagination-summary', slots.summary(), { dir: 'auto' })
const PaginationContent = part('PaginationContent', 'ul', 'pagination-content', slots.content())
const PaginationItem = part('PaginationItem', 'li', 'pagination-item', slots.item())
const PaginationEllipsis = part('PaginationEllipsis', 'span', 'pagination-ellipsis', slots.ellipsis(), { 'aria-hidden': 'true', 'innerHTML': '&hellip;' })

const Pagination = Object.assign(PaginationRoot, {
  Root: PaginationRoot,
  Summary: PaginationSummary,
  Content: PaginationContent,
  Item: PaginationItem,
  Link: PaginationLink,
  Previous: PaginationPrevious,
  PreviousIcon: PaginationPreviousIcon,
  Next: PaginationNext,
  NextIcon: PaginationNextIcon,
  Ellipsis: PaginationEllipsis,
})

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationNextIcon, PaginationPrevious, PaginationPreviousIcon, PaginationRoot, PaginationSummary }
