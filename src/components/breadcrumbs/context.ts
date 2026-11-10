import type { ComputedRef, InjectionKey } from 'vue'

export interface BreadcrumbsContext {
  register: (el: HTMLElement) => () => void
  /** The last item in DOM order; it is the current page. */
  current: ComputedRef<HTMLElement | undefined>
}

export const breadcrumbsKey: InjectionKey<BreadcrumbsContext> = Symbol('heroui-breadcrumbs')
