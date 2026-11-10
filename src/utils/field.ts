import type { ComputedRef, InjectionKey } from 'vue'
import { computed, inject, provide, useId } from 'vue'

export interface FieldProps {
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  isReadOnly?: boolean
}

export interface FieldContext extends FieldProps {
  /** id of the control; Label points at it */
  id: string
  labelId: string
  descriptionId: string
  errorId: string
  /** 'span' when the Label sits inside the control itself (Checkbox, Radio, Switch) */
  labelAs: 'label' | 'span'
}

const fieldKey: InjectionKey<ComputedRef<FieldContext>> = Symbol('heroui-field')

/**
 * Called by a field root (TextField, Select, RadioGroup, Checkbox…) so that the Label, control,
 * Description and FieldError rendered inside it are wired together (for/id, aria-describedby, state).
 * Pass the root's reactive `props` object.
 */
export function provideField(props: FieldProps, labelAs: FieldContext['labelAs'] = 'label') {
  const id = useId()
  const field = computed<FieldContext>(() => ({
    id,
    labelId: `${id}-label`,
    descriptionId: `${id}-description`,
    errorId: `${id}-error`,
    labelAs,
    isDisabled: props.isDisabled,
    isInvalid: props.isInvalid,
    isRequired: props.isRequired,
    isReadOnly: props.isReadOnly,
  }))
  provide(fieldKey, field)
  return field
}

/** The enclosing field, if any. */
export const useField = () => inject(fieldKey, undefined)

/** State attributes for a field root element, in the form @heroui/styles selects on. */
export function fieldStateAttrs(props: FieldProps) {
  return {
    'data-disabled': props.isDisabled || undefined,
    'data-invalid': props.isInvalid || undefined,
    'data-required': props.isRequired || undefined,
    'data-readonly': props.isReadOnly || undefined,
  }
}

/** Attributes for the control element inside a field (input, trigger button…). */
export function fieldControlAttrs(field: FieldContext | undefined) {
  if (!field)
    return {}
  return {
    'id': field.id,
    'aria-labelledby': field.labelId,
    'aria-describedby': `${field.descriptionId} ${field.errorId}`,
    'aria-invalid': field.isInvalid || undefined,
    'aria-required': field.isRequired || undefined,
  }
}
