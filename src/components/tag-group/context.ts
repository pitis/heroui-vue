import type { TagVariants } from '@heroui/styles'
import type { InjectionKey } from 'vue'

/** Provided as a reactive object by TagGroup, read by TagGroup.List and Tag. */
export interface TagGroupContext {
  size?: TagVariants['size']
  variant?: TagVariants['variant']
  selectionMode: 'none' | 'single' | 'multiple'
  disallowEmptySelection?: boolean
  isDisabled?: boolean
  selected: string | string[] | undefined
  select: (value: string | string[] | undefined) => void
  /** Set when the TagGroup has a `@remove` listener: tags show a remove button. */
  remove?: (keys: string[]) => void
}

export const tagGroupKey: InjectionKey<TagGroupContext> = Symbol('heroui-tag-group')
