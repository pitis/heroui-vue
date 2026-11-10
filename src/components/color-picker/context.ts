import type { Color } from 'reka-ui'
import type { InjectionKey, Ref, WritableComputedRef } from 'vue'
import { colorToString } from 'reka-ui'
import { computed, inject } from 'vue'

export type ColorValue = string | Color

/** Provided by ColorPicker: the color components inside edit this value instead of their own v-model. */
export const colorPickerKey: InjectionKey<Ref<ColorValue>> = Symbol('heroui-color-picker')

/** A color component's value: the enclosing ColorPicker's when there is one, else its own v-model. */
export function useColorValue(own: Ref<ColorValue | undefined>): Ref<ColorValue | undefined> | WritableComputedRef<ColorValue | undefined> {
  const picker = inject(colorPickerKey, undefined)
  return picker ? computed({ get: () => picker.value, set: v => v != null && (picker.value = v) }) : own
}

/** CSS color for a value (Reka color objects become hex, alpha included). */
export function toCssColor(value: ColorValue | undefined) {
  return value == null ? undefined : typeof value === 'string' ? value : colorToString(value, 'hex')
}
