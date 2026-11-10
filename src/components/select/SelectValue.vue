<script setup lang="ts">
import { SelectValue as RekaSelectValue } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { selectKey } from './context'

const select = inject(selectKey)!
</script>

<template>
  <!-- Reka marks it data-placeholder while nothing is selected -->
  <RekaSelectValue v-slot="{ selectedLabel }" as-child :placeholder="select.placeholder">
    <Bridge as="span" :data-slot="`${select.prefix}-value`" :class="select.slots.value()">
      <slot :selected-label="selectedLabel">
        {{ selectedLabel.length ? selectedLabel.join(', ') : select.placeholder }}
      </slot>
    </Bridge>
  </RekaSelectValue>
</template>
