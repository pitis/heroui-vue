<script setup lang="ts">
import { Avatar, AvatarGroup, Badge } from 'heroui-vue'

const photo = 'https://i.pravatar.cc/150?img=5'
const people = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Linus Torvalds', 'Margaret Hamilton', 'Dennis Ritchie']
function initials(fullName: string) {
  return fullName.split(' ').map(word => word[0]).join('')
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Avatar v-for="size in (['sm', 'md', 'lg'] as const)" :key="size" :size="size">
      <Avatar.Image :src="photo" />
      <Avatar.Fallback :delay-ms="300">
        JD
      </Avatar.Fallback>
    </Avatar>
    <Avatar v-for="color in (['accent', 'success', 'warning', 'danger'] as const)" :key="color" :color="color" variant="soft">
      <Avatar.Fallback>{{ color[0]!.toUpperCase() }}</Avatar.Fallback>
    </Avatar>
    <Badge.Anchor>
      <Avatar>
        <Avatar.Fallback>AL</Avatar.Fallback>
      </Avatar>
      <Badge color="success" size="sm" />
    </Badge.Anchor>
  </div>
  <AvatarGroup :max="4">
    <Avatar v-for="person in people" :key="person">
      <Avatar.Fallback>{{ initials(person) }}</Avatar.Fallback>
    </Avatar>
  </AvatarGroup>
  <AvatarGroup size="sm" overlap="ring">
    <Avatar v-for="person in people.slice(0, 3)" :key="person" color="accent">
      <Avatar.Fallback>{{ initials(person) }}</Avatar.Fallback>
    </Avatar>
  </AvatarGroup>
</template>
