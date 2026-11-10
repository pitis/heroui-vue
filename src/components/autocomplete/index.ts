import { Select } from '../select'
import AutocompleteRoot from './Autocomplete.vue'
import AutocompleteFilter from './AutocompleteFilter.vue'

export { autocompleteVariants } from '@heroui/styles'

// the other parts are Select's; they take the autocomplete classes and data-slots from the root
const { Trigger: AutocompleteTrigger, Value: AutocompleteValue, Indicator: AutocompleteIndicator, ClearButton: AutocompleteClearButton, Popover: AutocompletePopover } = Select

const Autocomplete = Object.assign(AutocompleteRoot, {
  Root: AutocompleteRoot,
  Trigger: AutocompleteTrigger,
  Value: AutocompleteValue,
  Indicator: AutocompleteIndicator,
  ClearButton: AutocompleteClearButton,
  Popover: AutocompletePopover,
  Filter: AutocompleteFilter,
})

export { Autocomplete, AutocompleteClearButton, AutocompleteFilter, AutocompleteIndicator, AutocompletePopover, AutocompleteRoot, AutocompleteTrigger, AutocompleteValue }
