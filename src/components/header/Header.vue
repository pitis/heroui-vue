<script setup lang="ts">
import { headerVariants } from '@heroui/styles'
import { inject } from 'vue'
import { sectionLabelKey } from '../list-box/context'

// inside a ListBox.Section / Menu section it becomes that group's label (aria-labelledby)
const label = inject(sectionLabelKey, undefined)
</script>

<template>
  <component :is="label" v-if="label" as-child>
    <header data-slot="header" :class="headerVariants()">
      <slot />
    </header>
  </component>
  <header v-else data-slot="header" :class="headerVariants()">
    <slot />
  </header>
</template>
