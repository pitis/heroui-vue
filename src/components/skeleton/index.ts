import { skeletonVariants } from '@heroui/styles'
import SkeletonRoot from './Skeleton.vue'

export { skeletonVariants }

const Skeleton = Object.assign(SkeletonRoot, { Root: SkeletonRoot })

export { Skeleton, SkeletonRoot }
