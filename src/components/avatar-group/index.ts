import AvatarGroupRoot from './AvatarGroup'
import AvatarGroupCount from './AvatarGroupCount.vue'

export { avatarGroupVariants } from '@heroui/styles'

const AvatarGroup = Object.assign(AvatarGroupRoot, { Root: AvatarGroupRoot, Count: AvatarGroupCount })

export { AvatarGroup, AvatarGroupCount, AvatarGroupRoot }
