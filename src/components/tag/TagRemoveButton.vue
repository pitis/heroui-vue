<script setup lang="ts">
import { closeButtonVariants, tagVariants } from '@heroui/styles'
import { TagGroupItemDelete } from 'reka-ui'
import { CloseIcon } from '../icons'
</script>

<template>
  <!-- styled as HeroUI's CloseButton, but it is Reka's delete control so it removes this tag -->
  <TagGroupItemDelete
    aria-label="Remove tag"
    slot="remove"
    data-slot="tag-remove-button"
    :class="[closeButtonVariants(), tagVariants().removeButton()]"
  >
    <slot>
      <CloseIcon data-slot="close-button-icon" />
    </slot>
  </TagGroupItemDelete>
</template>
