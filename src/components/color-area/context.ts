import type { ComputedRef, InjectionKey, Ref } from 'vue'

export const colorAreaKey: InjectionKey<{ css: ComputedRef<string | undefined>, dragging: Ref<boolean>, isDisabled: ComputedRef<boolean | undefined> }> = Symbol('heroui-color-area')
