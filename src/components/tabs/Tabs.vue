<script setup lang="ts">
import type { TabsVariants } from '@heroui/styles'
import { tabsVariants } from '@heroui/styles'
import { TabsRoot } from 'reka-ui'
import { provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { tabsKey } from './context'

withDefaults(defineProps<{
  variant?: TabsVariants['variant']
  align?: TabsVariants['align']
  orientation?: 'horizontal' | 'vertical'
}>(), { orientation: 'horizontal' })

/** `id` of the selected Tab. Defaults to the first Tab. */
const selectedKey = defineModel<string>()

provide(tabsKey, { selectedKey })
</script>

<template>
  <TabsRoot v-model="selectedKey" as-child :orientation="orientation">
    <Bridge data-slot="tabs" :class="tabsVariants({ align, variant }).base()">
      <slot />
    </Bridge>
  </TabsRoot>
</template>
