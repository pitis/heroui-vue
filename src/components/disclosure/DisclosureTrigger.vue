<script setup lang="ts">
import { inject } from 'vue'
import { disclosureKey } from './context'

const disclosure = inject(disclosureKey)!
</script>

<template>
  <button
    :id="disclosure.triggerId"
    type="button"
    slot="trigger"
    :data-slot="`${disclosure.look.prefix}-trigger`"
    :class="disclosure.look.classes.trigger"
    :aria-expanded="disclosure.isExpanded.value"
    :aria-controls="disclosure.panelId"
    :disabled="disclosure.isDisabled.value"
    @click="disclosure.toggle"
  >
    <slot :is-expanded="disclosure.isExpanded.value" />
  </button>
</template>
