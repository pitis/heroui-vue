<script setup lang="ts">
import { tabsVariants } from '@heroui/styles'
import { TabsContent } from 'reka-ui'
import { Bridge } from '../../utils/bridge'

defineProps<{
  /** `id` of the Tab this panel belongs to. */
  id: string
}>()
</script>

<template>
  <TabsContent as-child :value="id">
    <Bridge data-slot="tabs-panel" :class="tabsVariants().tabPanel()">
      <slot />
    </Bridge>
  </TabsContent>
</template>
