<script setup lang="ts">
import { PopoverArrow as RekaPopoverArrow } from 'reka-ui'
import { useRegisterArrow } from '../../utils/placement'

useRegisterArrow()
</script>

<template>
  <RekaPopoverArrow as-child :width="12" :height="12">
    <!-- Reka already turns the arrow to face the trigger; cancel the per-placement rotation in @heroui/styles -->
    <svg
      data-slot="popover-overlay-arrow"
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
      style="rotate: none"
    >
      <path d="M0 0C5.48483 8 6.5 8 12 0Z" />
    </svg>
  </RekaPopoverArrow>
</template>
