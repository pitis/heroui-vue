<script setup lang="ts">
import type { AvatarVariants } from '@heroui/styles'
import { avatarGroupVariants } from '@heroui/styles'
import { Avatar, AvatarFallback } from '../avatar'

defineProps<{
  color?: AvatarVariants['color']
  size?: AvatarVariants['size']
  variant?: AvatarVariants['variant']
}>()
</script>

<template>
  <Avatar :color="color" :size="size" :variant="variant" data-slot="avatar-group-count" :class="avatarGroupVariants().count()">
    <AvatarFallback>
      <slot />
    </AvatarFallback>
  </Avatar>
</template>
