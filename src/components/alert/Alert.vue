<script setup lang="ts">
import type { AlertVariants } from '@heroui/styles'
import { alertVariants } from '@heroui/styles'
import { computed, provide } from 'vue'
import { surfaceKey } from '../surface/context'
import { alertStatusKey } from './context'

const props = defineProps<{ status?: AlertVariants['status'] }>()

provide(alertStatusKey, computed(() => props.status))
provide(surfaceKey, computed(() => 'default' as const))
</script>

<template>
  <div data-slot="alert-root" :class="alertVariants({ status }).base()">
    <slot />
  </div>
</template>
