<script setup lang="ts">
import { ColorSwatchPickerItem as RekaColorSwatchPickerItem } from 'reka-ui'
import { inject, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { DISABLED_ITEM_STYLE } from '../list-box/context'
import { colorSwatchPickerItemKey, colorSwatchPickerKey } from './context'

const props = defineProps<{ color: string, isDisabled?: boolean }>()

const picker = inject(colorSwatchPickerKey)!
provide(colorSwatchPickerItemKey, { color: props.color })
</script>

<template>
  <RekaColorSwatchPickerItem as-child :value="color" :disabled="isDisabled">
    <Bridge
      :highlight="false"
      data-slot="color-swatch-picker-item"
      :class="picker.slots.item()"
      :style="{ '--color-swatch-current': color, ...(isDisabled ? DISABLED_ITEM_STYLE : {}) }"
    >
      <slot />
    </Bridge>
  </RekaColorSwatchPickerItem>
</template>
