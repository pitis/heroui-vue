import LinkRoot from './Link.vue'
import LinkIcon from './LinkIcon.vue'

export { linkVariants } from '@heroui/styles'

const Link = Object.assign(LinkRoot, { Root: LinkRoot, Icon: LinkIcon })

export { Link, LinkIcon, LinkRoot }
