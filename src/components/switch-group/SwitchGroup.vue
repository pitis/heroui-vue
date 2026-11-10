<script setup lang="ts">
import type { SwitchGroupVariants } from '@heroui/styles'
import { switchGroupVariants } from '@heroui/styles'

defineProps<{ orientation?: SwitchGroupVariants['orientation'] }>()
</script>

<template>
  <div data-slot="switch-group" :class="switchGroupVariants({ orientation }).base()">
    <div data-slot="switch-group-items" :class="switchGroupVariants({ orientation }).items()">
      <slot />
    </div>
  </div>
</template>
