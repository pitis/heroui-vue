import type { AvatarVariants } from '@heroui/styles'
import type { ComputedRef, InjectionKey } from 'vue'

export interface AvatarStyle {
  color?: AvatarVariants['color']
  size?: AvatarVariants['size']
  variant?: AvatarVariants['variant']
}

/** Set by Avatar (for its Image/Fallback) and by AvatarGroup (defaults for the Avatars inside). */
export const avatarKey: InjectionKey<ComputedRef<AvatarStyle>> = Symbol('heroui-avatar')
export const avatarGroupKey: InjectionKey<ComputedRef<AvatarStyle>> = Symbol('heroui-avatar-group')
