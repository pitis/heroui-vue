import { fieldsetVariants } from '@heroui/styles'
import { part } from '../../utils/part'
import FieldsetRoot from './Fieldset.vue'

export { fieldsetVariants }

const FieldsetLegend = part('FieldsetLegend', 'legend', 'fieldset-legend', fieldsetVariants().legend())
const FieldGroup = part('FieldGroup', 'div', 'fieldset-field-group', fieldsetVariants().fieldGroup())
const FieldsetActions = part('FieldsetActions', 'div', 'fieldset-actions', fieldsetVariants().actions())

const Fieldset = Object.assign(FieldsetRoot, {
  Root: FieldsetRoot,
  Legend: FieldsetLegend,
  Group: FieldGroup,
  Actions: FieldsetActions,
})

export { FieldGroup, Fieldset, FieldsetActions, FieldsetLegend, FieldsetRoot }
