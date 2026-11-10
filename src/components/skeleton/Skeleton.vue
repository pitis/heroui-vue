<script setup lang="ts">
import type { SkeletonVariants } from '@heroui/styles'
import { skeletonVariants } from '@heroui/styles'

defineProps<{ animationType?: SkeletonVariants['animationType'] }>()
</script>

<template>
  <div :class="skeletonVariants({ animationType }).base()">
    <slot />
  </div>
</template>
