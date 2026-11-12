<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { inject } from 'vue'
import { disclosureKey } from './context'

defineProps<{
  /** Make the single child the trigger (e.g. a Button) instead of rendering a styled button. */
  asChild?: boolean
}>()

const disclosure = inject(disclosureKey)!
</script>

<template>
  <Primitive
    :id="disclosure.triggerId"
    as="button"
    :as-child="asChild"
    :type="asChild ? undefined : 'button'"
    slot="trigger"
    :data-slot="`${disclosure.look.prefix}-trigger`"
    :class="asChild ? undefined : disclosure.look.classes.trigger"
    :aria-expanded="disclosure.isExpanded.value"
    :aria-controls="disclosure.panelId"
    :disabled="disclosure.isDisabled.value"
    @click="disclosure.toggle"
  >
    <slot :is-expanded="disclosure.isExpanded.value" />
  </Primitive>
</template>
