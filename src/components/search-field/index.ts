import SearchFieldRoot from './SearchField.vue'
import SearchFieldClearButton from './SearchFieldClearButton.vue'
import SearchFieldGroup from './SearchFieldGroup.vue'
import SearchFieldInput from './SearchFieldInput.vue'
import SearchFieldSearchIcon from './SearchFieldSearchIcon.vue'

export { searchFieldVariants } from '@heroui/styles'

const SearchField = Object.assign(SearchFieldRoot, {
  Root: SearchFieldRoot,
  Group: SearchFieldGroup,
  Input: SearchFieldInput,
  SearchIcon: SearchFieldSearchIcon,
  ClearButton: SearchFieldClearButton,
})

export { SearchField, SearchFieldClearButton, SearchFieldGroup, SearchFieldInput, SearchFieldRoot, SearchFieldSearchIcon }
