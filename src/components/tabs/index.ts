import { tabsVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import Tab from './Tab.vue'
import TabIndicator from './TabIndicator.vue'
import TabList from './TabList.vue'
import TabPanel from './TabPanel.vue'
import TabsRoot from './Tabs.vue'

export { tabsVariants }

const slots = tabsVariants()
// shortcut: no overflow scroller / chevron buttons around the list; add them here if tab lists must scroll
const TabListContainer = part('TabListContainer', 'div', 'tabs-list-container', slots.tabListContainer())
const TabSeparator = part('TabSeparator', 'span', 'tabs-separator', slots.separator(), { 'aria-hidden': 'true' })

const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  ListContainer: TabListContainer,
  List: TabList,
  Tab,
  Indicator: TabIndicator,
  Separator: TabSeparator,
  Panel: TabPanel,
})

export { Tab, TabIndicator, TabList, TabListContainer, TabPanel, Tabs, TabSeparator, TabsRoot }
