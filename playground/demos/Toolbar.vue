<script setup lang="ts">
import { Button, Separator, ToggleButton, ToggleButtonGroup, Toolbar } from 'heroui-vue'
import { ref } from 'vue'

const formats = ref<string[]>([])
</script>

<template>
  <Toolbar aria-label="Text formatting">
    <ToggleButtonGroup v-model="formats" selection-mode="multiple" size="sm">
      <ToggleButton id="bold">
        Bold
      </ToggleButton>
      <ToggleButton id="italic">
        Italic
      </ToggleButton>
    </ToggleButtonGroup>
    <Separator />
    <Button size="sm" variant="tertiary">
      Copy
    </Button>
    <Button size="sm" variant="tertiary">
      Paste
    </Button>
  </Toolbar>
  <Toolbar orientation="vertical" is-attached aria-label="Tools" class="w-fit">
    <Button size="sm" variant="ghost">
      Move
    </Button>
    <Button size="sm" variant="ghost">
      Crop
    </Button>
    <Separator />
    <Button size="sm" variant="ghost">
      Export
    </Button>
  </Toolbar>
</template>
