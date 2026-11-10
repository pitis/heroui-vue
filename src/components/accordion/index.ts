import DisclosureBody from '../disclosure/DisclosureBody.vue'
import DisclosureHeading from '../disclosure/DisclosureHeading.vue'
import DisclosureIndicator from '../disclosure/DisclosureIndicator.vue'
import DisclosurePanel from '../disclosure/DisclosurePanel.vue'
import DisclosureTrigger from '../disclosure/DisclosureTrigger.vue'
import AccordionRoot from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'

export { accordionVariants } from '@heroui/styles'

// the parts are the Disclosure ones; they take the accordion classes from the item's context
const AccordionHeading = DisclosureHeading
const AccordionTrigger = DisclosureTrigger
const AccordionPanel = DisclosurePanel
const AccordionIndicator = DisclosureIndicator
const AccordionBody = DisclosureBody

const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Heading: AccordionHeading,
  Trigger: AccordionTrigger,
  Panel: AccordionPanel,
  Indicator: AccordionIndicator,
  Body: AccordionBody,
})

export { Accordion, AccordionBody, AccordionHeading, AccordionIndicator, AccordionItem, AccordionPanel, AccordionRoot, AccordionTrigger }
