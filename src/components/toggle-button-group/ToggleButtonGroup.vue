<script setup lang="ts">
import type { ToggleButtonVariants } from '@heroui/styles'
import { toggleButtonGroupVariants } from '@heroui/styles'
import { ToggleGroupRoot } from 'reka-ui'
import { computed, inject, provide } from 'vue'
import { Bridge } from '../../utils/bridge'
import { toggleButtonGroupKey, toolbarOrientationKey } from './context'

const props = withDefaults(defineProps<{
  selectionMode?: 'single' | 'multiple'
  /** Keep at least one button selected. */
  disallowEmptySelection?: boolean
  size?: ToggleButtonVariants['size']
  orientation?: 'horizontal' | 'vertical'
  fullWidth?: boolean
  /** Separate buttons with gaps instead of joining them. */
  isDetached?: boolean
  isDisabled?: boolean
}>(), { selectionMode: 'single' })

/** `id` of the selected ToggleButton (single), or the ids (multiple). */
const model = defineModel<string | string[]>()

// inside a Toolbar, the toolbar owns arrow-key navigation and the orientation
const toolbar = inject(toolbarOrientationKey, undefined)
const orientation = computed(() => props.orientation ?? toolbar?.value ?? 'horizontal')

provide(toggleButtonGroupKey, { size: computed(() => props.size), isDisabled: computed(() => props.isDisabled) })

function update(value: unknown) {
  const next = value as string | string[] | undefined
  const empty = next == null || next === '' || (Array.isArray(next) && !next.length)
  if (!(empty && props.disallowEmptySelection))
    model.value = next
}
</script>

<template>
  <ToggleGroupRoot
    as-child
    :type="selectionMode"
    :model-value="model"
    :orientation="orientation"
    :disabled="isDisabled"
    :roving-focus="!toolbar"
    @update:model-value="update"
  >
    <Bridge data-slot="toggle-button-group" :class="toggleButtonGroupVariants({ fullWidth, isDetached, orientation }).base()">
      <slot />
    </Bridge>
  </ToggleGroupRoot>
</template>
