<script setup lang="ts">
import { Button, ButtonGroup, CloseButton, Spinner } from 'heroui-vue'

const variants = ['primary', 'secondary', 'tertiary', 'outline', 'ghost', 'danger', 'danger-soft'] as const
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Button v-for="variant in variants" :key="variant" :variant="variant">
      {{ variant }}
    </Button>
  </div>
  <div class="flex flex-wrap items-center gap-3">
    <Button size="sm">
      Small
    </Button>
    <Button size="lg">
      Large
    </Button>
    <Button is-disabled>
      Disabled
    </Button>
    <Button is-pending>
      <Spinner color="current" size="sm" /> Saving
    </Button>
    <CloseButton />
    <ButtonGroup variant="secondary">
      <Button>One</Button>
      <ButtonGroup.Separator />
      <Button>Two</Button>
    </ButtonGroup>
  </div>
</template>
