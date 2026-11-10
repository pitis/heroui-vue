<script setup lang="ts">
import { breadcrumbsVariants } from '@heroui/styles'
import { computed, provide, shallowRef } from 'vue'
import { breadcrumbsKey } from './context'

const items = shallowRef<HTMLElement[]>([])

provide(breadcrumbsKey, {
  register(el) {
    // keep DOM order so the last rendered item is the current one, however items are added
    items.value = [...items.value, el].sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
    return () => (items.value = items.value.filter(item => item !== el))
  },
  current: computed(() => items.value.at(-1)),
})
</script>

<template>
  <ol data-slot="breadcrumbs" :class="breadcrumbsVariants().base()">
    <slot />
  </ol>
</template>
