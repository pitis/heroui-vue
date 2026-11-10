import DisclosureRoot from './Disclosure.vue'
import DisclosureBody from './DisclosureBody.vue'
import DisclosureHeading from './DisclosureHeading.vue'
import DisclosureIndicator from './DisclosureIndicator.vue'
import DisclosureContent from './DisclosurePanel.vue'
import DisclosureTrigger from './DisclosureTrigger.vue'

export { disclosureVariants } from '@heroui/styles'

const Disclosure = Object.assign(DisclosureRoot, {
  Root: DisclosureRoot,
  Heading: DisclosureHeading,
  Trigger: DisclosureTrigger,
  Content: DisclosureContent,
  Body: DisclosureBody,
  Indicator: DisclosureIndicator,
})

export { Disclosure, DisclosureBody, DisclosureContent, DisclosureHeading, DisclosureIndicator, DisclosureRoot, DisclosureTrigger }
