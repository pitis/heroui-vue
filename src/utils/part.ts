import type { VNode } from 'vue'
import { defineComponent, Fragment, h, Text } from 'vue'

/**
 * A style-only compound part (Card.Header, Alert.Title…): a fixed element carrying its
 * BEM class and data-slot. Hundreds of parts are exactly this, hence a factory instead of an SFC each.
 * Attrs, class and listeners fall through onto the element.
 */
export function part(name: string, as: string, slot: string, className: string, attrs?: Record<string, unknown>) {
  return defineComponent({
    name,
    setup: (_, { slots }) => () => h(as, { 'class': className, 'data-slot': slot, ...attrs }, slots.default?.()),
  })
}

/** True when a slot rendered only text (`<Chip>New</Chip>`); HeroUI wraps such content in the component's Label part. */
export function isTextOnly(nodes: VNode[] = []): boolean {
  return nodes.length > 0 && nodes.every(node => node.type === Text || (node.type === Fragment && isTextOnly(node.children as VNode[])))
}
