<script setup lang="ts">
import { SelectTrigger as RekaSelectTrigger } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { fieldControlAttrs, useField } from '../../utils/field'
import { selectKey } from './context'

const select = inject(selectKey)!
const field = useField()

// with a Select.ClearButton present, Backspace/Delete clears the selection (as in HeroUI)
function onKeydown(event: KeyboardEvent) {
  if ((event.key === 'Backspace' || event.key === 'Delete') && select.clearButtons > 0 && !select.isEmpty && !select.open) {
    event.preventDefault()
    select.clear()
  }
}
</script>

<template>
  <RekaSelectTrigger as-child>
    <Bridge
      as="button"
      :data-slot="`${select.prefix}-trigger`"
      :class="select.slots.trigger()"
      v-bind="fieldControlAttrs(field)"
      @keydown="onKeydown"
    >
      <slot :is-open="select.open" />
    </Bridge>
  </RekaSelectTrigger>
</template>
