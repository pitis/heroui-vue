<script setup lang="ts">
import type { DrawerPlacement } from './context'
import { drawerVariants } from '@heroui/styles'
import { computed, inject, provide } from 'vue'
import { drawerKey, drawerLayoutKey } from './context'

const props = withDefaults(defineProps<{ placement?: DrawerPlacement }>(), { placement: 'bottom' })

const drawer = inject(drawerKey)!
const backdrop = inject(drawerLayoutKey, undefined)
provide(drawerLayoutKey, computed(() => ({ ...backdrop?.value, placement: props.placement })))
</script>

<template>
  <!-- slides in with an animation on data-entering; data-exiting slides the dialog out with a transition -->
  <div
    data-slot="drawer-content"
    :class="drawerVariants({ placement }).content()"
    :data-placement="placement"
    :data-entering="drawer.open.value || undefined"
    :data-exiting="!drawer.open.value || undefined"
  >
    <slot />
  </div>
</template>
