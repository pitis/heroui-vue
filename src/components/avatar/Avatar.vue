<script setup lang="ts">
import type { AvatarVariants } from '@heroui/styles'
import { avatarVariants } from '@heroui/styles'
import { AvatarRoot } from 'reka-ui'
import { computed, inject, provide } from 'vue'
import { avatarGroupKey, avatarKey } from './context'

const props = defineProps<{
  color?: AvatarVariants['color']
  size?: AvatarVariants['size']
  variant?: AvatarVariants['variant']
}>()

// unset props inherit from an enclosing AvatarGroup
const group = inject(avatarGroupKey, undefined)
const style = computed(() => ({
  color: props.color ?? group?.value.color,
  size: props.size ?? group?.value.size,
  variant: props.variant ?? group?.value.variant,
}))
provide(avatarKey, style)
</script>

<template>
  <AvatarRoot data-slot="avatar" :class="avatarVariants(style).base()">
    <slot />
  </AvatarRoot>
</template>
