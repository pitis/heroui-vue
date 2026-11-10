import type { InjectionKey, Ref } from 'vue'

export interface SortDescriptor {
  column: string
  direction: 'ascending' | 'descending'
}

export const tableSortKey: InjectionKey<Ref<SortDescriptor | undefined>> = Symbol('heroui-table-sort')
