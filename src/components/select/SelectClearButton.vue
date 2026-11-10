<script setup lang="ts">
import { inject, onBeforeUnmount } from 'vue'
import { CloseIcon } from '../icons'
import { selectKey } from './context'

// Sits inside Select.Trigger; hidden from assistive tech, which clears with Backspace/Delete on the trigger.
const select = inject(selectKey)!
select.clearButtons++
onBeforeUnmount(() => select.clearButtons--)

function clear(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  if (!select.isDisabled && !select.isEmpty)
    select.clear()
}
</script>

<template>
  <!-- pointerdown must not reach the trigger, or the popover would open -->
  <span
    aria-hidden="true"
    :data-slot="`${select.prefix}-clear-button`"
    :class="select.slots.clearButton()"
    :data-empty="select.isEmpty || undefined"
    @pointerdown.stop
    @click="clear"
  >
    <slot>
      <CloseIcon :data-slot="`${select.prefix}-clear-button-icon`" />
    </slot>
  </span>
</template>
