import AvatarRoot from './Avatar.vue'
import AvatarFallback from './AvatarFallback.vue'
import AvatarImage from './AvatarImage.vue'

export { avatarVariants } from '@heroui/styles'

const Avatar = Object.assign(AvatarRoot, { Root: AvatarRoot, Image: AvatarImage, Fallback: AvatarFallback })

export { Avatar, AvatarFallback, AvatarImage, AvatarRoot }
