<script setup lang="ts">
import { inject } from 'vue'
import { disclosureKey } from './context'

withDefaults(defineProps<{ level?: 1 | 2 | 3 | 4 | 5 | 6 }>(), { level: 3 })

const disclosure = inject(disclosureKey)!
</script>

<template>
  <component :is="`h${level}`" :data-slot="`${disclosure.look.prefix}-heading`" :class="disclosure.look.classes.heading">
    <slot />
  </component>
</template>
