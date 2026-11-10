<script setup lang="ts">
import { colorAreaVariants } from '@heroui/styles'
import { ColorAreaThumb as RekaColorAreaThumb } from 'reka-ui'
import { inject } from 'vue'
import { Bridge } from '../../utils/bridge'
import { colorAreaKey } from './context'

const area = inject(colorAreaKey)!
</script>

<template>
  <RekaColorAreaThumb as-child>
    <Bridge
      interactive
      data-slot="color-area-thumb"
      :class="colorAreaVariants().thumb()"
      :style="{ '--color-area-thumb-color': area.css.value }"
      :data-dragging="area.dragging.value || undefined"
      :data-disabled="area.isDisabled.value || undefined"
    />
  </RekaColorAreaThumb>
</template>
