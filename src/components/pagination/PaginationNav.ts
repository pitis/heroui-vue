import { paginationVariants } from '@heroui/styles'
import { defineComponent, h } from 'vue'
import { IconChevronLeft, IconChevronRight } from '../icons'

const navClass = `${paginationVariants().link()} pagination__link--nav`

/** Previous / Next buttons; put their Icon part and/or a label inside. */
function navButton(name: string, slot: string) {
  return defineComponent({
    name,
    props: { isDisabled: Boolean },
    setup: (props, { slots }) => () => h('button', { 'type': 'button', 'class': navClass, 'data-slot': slot, 'disabled': props.isDisabled }, slots.default?.()),
  })
}

function navIcon(name: string, slot: string, icon: typeof IconChevronLeft) {
  return defineComponent({
    name,
    setup: (_, { slots }) => () => h('span', { 'aria-hidden': 'true', 'data-slot': slot }, slots.default?.() ?? h(icon)),
  })
}

export const PaginationPrevious = navButton('PaginationPrevious', 'pagination-previous')
export const PaginationNext = navButton('PaginationNext', 'pagination-next')
export const PaginationPreviousIcon = navIcon('PaginationPreviousIcon', 'pagination-previous-icon', IconChevronLeft)
export const PaginationNextIcon = navIcon('PaginationNextIcon', 'pagination-next-icon', IconChevronRight)
