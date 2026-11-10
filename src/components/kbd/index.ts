import { kbdVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import KbdRoot from './Kbd.vue'
import KbdAbbr from './KbdAbbr.vue'

export { kbdVariants }
export { type KbdKey, kbdKeysLabelMap, kbdKeysMap } from './constants'

const KbdContent = part('KbdContent', 'span', 'kbd-content', kbdVariants().content())

const Kbd = Object.assign(KbdRoot, { Root: KbdRoot, Abbr: KbdAbbr, Content: KbdContent })

export { Kbd, KbdAbbr, KbdContent, KbdRoot }
