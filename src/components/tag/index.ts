import TagRoot from './Tag.vue'
import TagRemoveButton from './TagRemoveButton.vue'

export { tagVariants } from '@heroui/styles'

const Tag = Object.assign(TagRoot, { Root: TagRoot, RemoveButton: TagRemoveButton })

export { Tag, TagRemoveButton, TagRoot }
