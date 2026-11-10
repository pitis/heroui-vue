import type { InputVariants } from '@heroui/styles'
import type { ComputedRef, InjectionKey } from 'vue'

/** Provided by field roots (TextField, SearchField, ComboBox…) so the Input inside inherits their `variant`. */
export const inputVariantKey: InjectionKey<ComputedRef<InputVariants['variant']>> = Symbol('heroui-input-variant')

/**
 * Set by ComboBox: the Input inside becomes its combobox input. `displayValue` maps a selected id to its text;
 * `selectedText` is the current one, known once the items have registered.
 */
export const comboboxInputKey: InjectionKey<{ displayValue: (value: unknown) => string, selectedText: ComputedRef<string | undefined> }> = Symbol('heroui-combobox-input')
