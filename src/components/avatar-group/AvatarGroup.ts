import type { AvatarVariants } from '@heroui/styles'
import type { PropType, SlotsType, VNode } from 'vue'
import { avatarGroupVariants } from '@heroui/styles'
import { computed, defineComponent, Fragment, h, provide } from 'vue'
import { avatarGroupKey } from '../avatar/context'
import AvatarGroupCount from './AvatarGroupCount.vue'

const flatten = (nodes: VNode[]): VNode[] =>
  nodes.flatMap(node => (node.type === Fragment ? flatten(node.children as VNode[]) : typeof node.type === 'symbol' ? [] : [node]))

/** Overlapping (or grid) row of Avatars; `max` collapses the rest into a "+N" count. */
export default defineComponent({
  name: 'AvatarGroup',
  props: {
    color: String as PropType<AvatarVariants['color']>,
    size: { type: String as PropType<AvatarVariants['size']>, default: 'md' },
    variant: String as PropType<AvatarVariants['variant']>,
    max: Number,
    isGrid: Boolean,
    overlap: { type: String as PropType<'clip' | 'ring'>, default: 'clip' },
  },
  slots: Object as SlotsType<{ default?: () => VNode[] }>,
  setup(props, { slots }) {
    provide(avatarGroupKey, computed(() => ({ color: props.color, size: props.size, variant: props.variant })))
    return () => {
      const children = flatten(slots.default?.() ?? [])
      const counts = children.filter(child => child.type === AvatarGroupCount)
      const avatars = children.filter(child => child.type !== AvatarGroupCount)
      const visible = props.max == null ? avatars : avatars.slice(0, Math.max(0, props.max))
      const remaining = avatars.length - visible.length
      return h('div', { 'data-slot': 'avatar-group', 'class': avatarGroupVariants({ isGrid: props.isGrid, overlap: props.overlap }).base() }, [
        ...visible,
        ...(counts.length ? counts : remaining > 0 ? [h(AvatarGroupCount, null, () => `+${remaining}`)] : []),
      ])
    }
  },
})
