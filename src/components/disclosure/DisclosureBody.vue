<script setup lang="ts">
import { inject } from 'vue'
import { disclosureKey } from './context'

const disclosure = inject(disclosureKey)!
</script>

<template>
  <div :data-slot="`${disclosure.look.prefix}-body`" :class="disclosure.look.classes.body">
    <div :class="disclosure.look.classes.bodyInner">
      <slot />
    </div>
  </div>
</template>
