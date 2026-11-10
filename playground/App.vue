<script setup lang="ts">
import type { Component } from 'vue'

// Every file in ./demos is one section; add a demo by adding a file. `?only=Alert,Chip` shows just those.
const only = new URLSearchParams(location.search).get('only')?.split(',')
const demos = Object.entries(import.meta.glob<Component>('./demos/*.vue', { eager: true, import: 'default' }))
  .map(([path, component]) => ({ name: path.slice('./demos/'.length, -'.vue'.length), component }))
  .filter(demo => !only || only.includes(demo.name))
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-10 p-8">
    <section v-for="demo in demos" :id="demo.name" :key="demo.name" class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ demo.name }}</h2>
      <component :is="demo.component" />
    </section>
  </main>
</template>
