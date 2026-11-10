<script setup lang="ts">
import type { SurfaceVariants } from '@heroui/styles'
import { surfaceVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { surfaceKey } from './context'

const props = withDefaults(defineProps<{ variant?: SurfaceVariants['variant'] }>(), { variant: 'default' })

provide(surfaceKey, computed(() => props.variant))
</script>

<template>
  <div data-slot="surface" :class="surfaceVariants({ variant })">
    <slot />
  </div>
</template>
