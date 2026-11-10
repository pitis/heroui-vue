<script setup lang="ts">
import { fieldsetVariants } from '@heroui/styles'

// shortcut: a native `disabled` fieldset disables native controls only; Reka-backed controls (RadioGroup, Slider…) need their own is-disabled
defineProps<{ disabled?: boolean }>()
</script>

<template>
  <fieldset data-slot="fieldset" :class="fieldsetVariants().base()" :disabled="disabled" :data-disabled="disabled || undefined">
    <slot />
  </fieldset>
</template>
