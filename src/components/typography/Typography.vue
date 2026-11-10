<script setup lang="ts">
import type { TypographyVariants } from '@heroui/styles'
import { typographyVariants } from '@heroui/styles'

type Type = NonNullable<TypographyVariants['type']>

const props = withDefaults(defineProps<{
  type?: Type
  align?: TypographyVariants['align']
  color?: TypographyVariants['color']
  weight?: TypographyVariants['weight']
  truncate?: boolean
  /** Element to render; defaults to the one matching `type` (h1–h6, p, code). */
  as?: string
}>(), { type: 'body', align: 'start', color: 'default' })

const elementByType: Record<Type, string> = {
  'body': 'p',
  'body-sm': 'p',
  'body-xs': 'p',
  'code': 'code',
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'h6': 'h6',
}
</script>

<template>
  <component
    :is="props.as ?? elementByType[type]"
    data-slot="typography"
    :data-type="type"
    :class="typographyVariants({ align, color, truncate, type, weight }).base()"
  >
    <slot />
  </component>
</template>
