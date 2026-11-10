<script setup lang="ts">
import { tabsVariants } from '@heroui/styles'
import { TabsTrigger } from 'reka-ui'
import { computed, inject, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { tabKey, tabsKey } from './context'

const props = defineProps<{
  /** Key of this tab; the matching Tabs.Panel has the same `id`. */
  id: string
  isDisabled?: boolean
}>()

const tabs = inject(tabsKey)!
// like React Aria, the first tab is selected when nothing else is
tabs.selectedKey.value ??= props.id

provide(tabKey, computed(() => tabs.selectedKey.value === props.id))
</script>

<template>
  <TabsTrigger as-child :value="id" :disabled="isDisabled">
    <Bridge as="button" data-slot="tabs-tab" :class="tabsVariants().tab()">
      <slot />
    </Bridge>
  </TabsTrigger>
</template>
