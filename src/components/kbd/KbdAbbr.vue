<script setup lang="ts">
import type { KbdKey } from './constants'
import { kbdVariants } from '@heroui/styles'
import { kbdKeysLabelMap, kbdKeysMap } from './constants'

defineProps<{ keyValue: KbdKey }>()
</script>

<template>
  <abbr :class="kbdVariants().abbr()" :title="kbdKeysLabelMap[keyValue]">{{ kbdKeysMap[keyValue] }}</abbr>
</template>
