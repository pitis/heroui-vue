<script setup lang="ts">
import { ToggleButton, ToggleButtonGroup } from 'heroui-vue'
import { ref } from 'vue'

const starred = ref(false)
const align = ref('left')
const formats = ref<string[]>(['bold'])
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <ToggleButton v-model="starred">
      {{ starred ? '★ Starred' : '☆ Star' }}
    </ToggleButton>
    <ToggleButton variant="ghost" size="sm">
      Ghost
    </ToggleButton>
    <ToggleButton is-disabled>
      Disabled
    </ToggleButton>
  </div>
  <div class="flex flex-wrap items-center gap-6">
    <ToggleButtonGroup v-model="align" disallow-empty-selection aria-label="Text alignment">
      <ToggleButton v-for="option in ['left', 'center', 'right']" :id="option" :key="option">
        {{ option }}
      </ToggleButton>
    </ToggleButtonGroup>
    <ToggleButtonGroup v-model="formats" selection-mode="multiple" size="sm" aria-label="Text format">
      <ToggleButton id="bold">
        B
      </ToggleButton>
      <ToggleButtonGroup.Separator />
      <ToggleButton id="italic">
        I
      </ToggleButton>
      <ToggleButtonGroup.Separator />
      <ToggleButton id="underline">
        U
      </ToggleButton>
    </ToggleButtonGroup>
    <ToggleButtonGroup is-detached aria-label="Detached">
      <ToggleButton id="a">
        A
      </ToggleButton>
      <ToggleButton id="b">
        B
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
  <p class="text-sm text-muted">
    align: {{ align }} · formats: {{ formats.join(', ') || 'none' }}
  </p>
</template>
