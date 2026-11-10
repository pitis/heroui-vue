import BreadcrumbsRoot from './Breadcrumbs.vue'
import BreadcrumbsItem from './BreadcrumbsItem.vue'

export { breadcrumbsVariants } from '@heroui/styles'

const Breadcrumbs = Object.assign(BreadcrumbsRoot, { Root: BreadcrumbsRoot, Item: BreadcrumbsItem })

export { Breadcrumbs, BreadcrumbsItem, BreadcrumbsRoot }
