<script setup lang="ts">
import type { ModalVariants } from '@heroui/styles'
import type { ModalLayout } from './context'
import { computed, inject, provide } from 'vue'
import { modalKey, modalLayoutKey } from './context'

const props = withDefaults(defineProps<{
  placement?: ModalLayout['placement']
  /** Modal only: whether the body or the whole page scrolls when content is long. */
  scroll?: ModalVariants['scroll']
  size?: ModalVariants['size']
}>(), { placement: 'auto' })

const modal = inject(modalKey)!
const backdrop = inject(modalLayoutKey, undefined)
provide(modalLayoutKey, computed(() => ({ ...backdrop?.value, placement: props.placement, scroll: props.scroll, size: props.size })))
</script>

<template>
  <!-- pointer-events: none in @heroui/styles, so clicks beside the dialog reach the backdrop and dismiss -->
  <div
    :data-slot="`${modal.look.prefix}-container`"
    :class="modal.look.variants({ scroll, size }).container()"
    :data-placement="placement"
    :data-entering="modal.open.value || undefined"
    :data-exiting="!modal.open.value || undefined"
  >
    <slot />
  </div>
</template>
