<script setup lang="ts">
import type { AvatarVariants } from '@heroui/styles'
import { avatarVariants } from '@heroui/styles'
import { AvatarFallback as RekaAvatarFallback } from 'reka-ui'
import { inject } from 'vue'
import { avatarKey } from './context'

defineProps<{
  /** Overrides the Avatar's color for the fallback. */
  color?: AvatarVariants['color']
  /** Wait this long before showing the fallback, to avoid a flash while the image loads. */
  delayMs?: number
}>()

const avatar = inject(avatarKey)!
</script>

<template>
  <RekaAvatarFallback :delay-ms="delayMs" data-slot="avatar-fallback" :class="avatarVariants({ ...avatar, color: color ?? avatar.color }).fallback()">
    <slot />
  </RekaAvatarFallback>
</template>
