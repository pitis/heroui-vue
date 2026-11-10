import type { ComputedRef, InjectionKey } from 'vue'

export interface DisclosureContext {
  isExpanded: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean | undefined>
  toggle: () => void
  triggerId: string
  panelId: string
  /** Class names and data-slot prefix: Disclosure and Accordion share these parts but not their styles. */
  look: DisclosureLook
}

export interface DisclosureLook {
  prefix: 'disclosure' | 'accordion'
  classes: { heading: string, trigger: string, panel: string, body: string, bodyInner: string, indicator: string }
}

export const disclosureKey: InjectionKey<DisclosureContext> = Symbol('heroui-disclosure')

/** Set by DisclosureGroup / Accordion: which items are expanded. */
export interface DisclosureGroupContext {
  isExpanded: (id: string) => boolean
  toggle: (id: string) => void
  isDisabled: ComputedRef<boolean | undefined>
  look?: DisclosureLook
  hideSeparator?: ComputedRef<boolean>
}

export const disclosureGroupKey: InjectionKey<DisclosureGroupContext> = Symbol('heroui-disclosure-group')
