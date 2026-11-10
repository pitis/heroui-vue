<script setup lang="ts">
import { Kbd } from 'heroui-vue'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Kbd>
      <Kbd.Abbr key-value="command" />
      <Kbd.Content>K</Kbd.Content>
    </Kbd>
    <Kbd variant="light">
      <Kbd.Abbr key-value="shift" />
      <Kbd.Abbr key-value="option" />
      <Kbd.Content>P</Kbd.Content>
    </Kbd>
    <Kbd>
      <Kbd.Abbr key-value="enter" />
    </Kbd>
    <Kbd>Esc</Kbd>
  </div>
</template>
