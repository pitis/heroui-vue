import type { SetupContext } from 'vue'
import { typographyVariants } from '@heroui/styles'
import { h } from 'vue'
import { part } from '../../utils/part'
import TypographyRoot from './Typography.vue'

export { typographyVariants }

type Slots = SetupContext['slots']

/** `<Heading :level="2">` → an h2 styled as h2. */
const Heading = (props: { level?: 1 | 2 | 3 | 4 | 5 | 6 }, { slots }: { slots: Slots }) =>
  h(TypographyRoot, { type: `h${props.level ?? 1}` }, slots)
Heading.props = ['level']

/** `<Paragraph size="sm">` → body text in one of three sizes. */
const Paragraph = (props: { size?: 'base' | 'sm' | 'xs' }, { slots }: { slots: Slots }) =>
  h(TypographyRoot, { type: !props.size || props.size === 'base' ? 'body' : `body-${props.size}` }, slots)
Paragraph.props = ['size']

const Code = (_: object, { slots }: { slots: Slots }) => h(TypographyRoot, { type: 'code' }, slots)

/** Styles raw HTML content (articles, markdown output) with the typography scale. */
const Prose = part('Prose', 'div', 'prose', typographyVariants().prose())

const Typography = Object.assign(TypographyRoot, { Root: TypographyRoot })

export { Code, Heading, Paragraph, Prose, Typography, TypographyRoot }
