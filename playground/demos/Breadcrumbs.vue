<script setup lang="ts">
import { Breadcrumbs } from 'heroui-vue'
</script>

<template>
  <nav aria-label="Breadcrumbs">
    <Breadcrumbs>
      <Breadcrumbs.Item href="#home">
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="#projects">
        Projects
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="#heroui-vue">
        heroui-vue
      </Breadcrumbs.Item>
    </Breadcrumbs>
  </nav>
</template>
