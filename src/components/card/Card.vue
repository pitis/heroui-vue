<script setup lang="ts">
import type { CardVariants } from '@heroui/styles'
import { cardVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { surfaceKey } from '../surface/context'

const props = withDefaults(defineProps<{ variant?: CardVariants['variant'] }>(), { variant: 'default' })

// a transparent card is not a surface of its own
provide(surfaceKey, computed(() => (props.variant === 'transparent' ? undefined : props.variant)))
</script>

<template>
  <div data-slot="card" :class="cardVariants({ variant }).base()">
    <slot />
  </div>
</template>
