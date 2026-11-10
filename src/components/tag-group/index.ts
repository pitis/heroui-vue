import TagGroupRoot from './TagGroup.vue'
import TagGroupList from './TagGroupList.vue'

export { tagGroupVariants } from '@heroui/styles'

const TagGroup = Object.assign(TagGroupRoot, { Root: TagGroupRoot, List: TagGroupList })

export { TagGroup, TagGroupList, TagGroupRoot }
