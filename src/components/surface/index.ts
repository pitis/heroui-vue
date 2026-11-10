import SurfaceRoot from './Surface.vue'

export { surfaceVariants } from '@heroui/styles'
export { surfaceKey } from './context'

const Surface = Object.assign(SurfaceRoot, { Root: SurfaceRoot })

export { Surface, SurfaceRoot }
