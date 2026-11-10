<script setup lang="ts">
import { tabsVariants } from '@heroui/styles'
import { TabsList } from 'reka-ui'
import { Bridge } from '../../utils/bridge'
</script>

<template>
  <TabsList as-child>
    <Bridge data-slot="tabs-list" :class="tabsVariants().tabList()">
      <slot />
    </Bridge>
  </TabsList>
</template>
