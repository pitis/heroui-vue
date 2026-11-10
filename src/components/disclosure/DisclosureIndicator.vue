<script setup lang="ts">
import { inject } from 'vue'
import { IconChevronDown } from '../icons'
import { disclosureKey } from './context'

const disclosure = inject(disclosureKey)!
</script>

<template>
  <IconChevronDown
    :data-slot="`${disclosure.look.prefix}-indicator`"
    :class="disclosure.look.classes.indicator"
    :data-expanded="disclosure.isExpanded.value || undefined"
  />
</template>
