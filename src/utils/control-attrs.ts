import type { InjectionKey, ShallowRef } from 'vue'
import { inject, onBeforeUpdate, provide, shallowRef, useAttrs } from 'vue'

// What React Aria puts on the input of a Switch, Checkbox or Radio rather than on the element around
// it: the control is what has to carry its name, its id (for a <label for>) and its description.
const CONTROL_ATTRS = ['id', 'aria-label', 'aria-labelledby', 'aria-describedby', 'aria-invalid', 'aria-errormessage']

type Attrs = Record<string, unknown>
const controlAttrsKey: InjectionKey<ShallowRef<Attrs>> = Symbol('heroui-control-attrs')

function split(attrs: Attrs): [root: Attrs, control: Attrs] {
  const root: Attrs = {}
  const control: Attrs = {}
  for (const [key, value] of Object.entries(attrs))
    (CONTROL_ATTRS.includes(key) ? control : root)[key] = value
  return [root, control]
}

/**
 * For the root of a Switch, Checkbox or Radio (declared with `inheritAttrs: false`): returns, per
 * render, the attributes its own element takes, and hands the control's to its `*.Content`.
 */
export function useRootAttrs(): () => Attrs {
  const attrs = useAttrs()
  const control = shallowRef(split(attrs)[1])
  // attrs is not reactive; refreshed before each update so the Content re-renders with them
  onBeforeUpdate(() => (control.value = split(attrs)[1]))
  provide(controlAttrsKey, control)
  return () => split(attrs)[0]
}

/** For the `*.Content`: the control's attributes, its description joined to the field's own. */
export function useControlAttrs(fieldDescribedBy: () => string | undefined): () => Attrs {
  const control = inject(controlAttrsKey, undefined)
  return () => {
    const attrs = control?.value ?? {}
    const describedBy = [fieldDescribedBy(), attrs['aria-describedby']].filter(Boolean).join(' ')
    return { ...attrs, 'aria-describedby': describedBy || undefined }
  }
}
