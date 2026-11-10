import { badgeVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import BadgeRoot from './Badge.vue'

export { badgeVariants }

const slots = badgeVariants()
/** Wraps the element the badge sits on (an Avatar, an icon button…). */
const BadgeAnchor = part('BadgeAnchor', 'span', 'badge-anchor', slots.anchor())
const BadgeLabel = part('BadgeLabel', 'span', 'badge-label', slots.label())

const Badge = Object.assign(BadgeRoot, { Root: BadgeRoot, Anchor: BadgeAnchor, Label: BadgeLabel })

export { Badge, BadgeAnchor, BadgeLabel, BadgeRoot }
