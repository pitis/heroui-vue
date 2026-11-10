<script setup lang="ts">
import { avatarVariants } from '@heroui/styles'
import { AvatarImage as RekaAvatarImage } from 'reka-ui'

// Only shown once loaded; until then (or on error) the Fallback is.
defineProps<{ src: string }>()
</script>

<template>
  <RekaAvatarImage :src="src" data-slot="avatar-image" :class="avatarVariants().image()" />
</template>
