<script setup lang="ts">
import { breadcrumbsVariants } from '@heroui/styles'
import { computed, inject, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { IconChevronRight } from '../icons'
import { Link } from '../link'
import { breadcrumbsKey } from './context'

// href, target… go to the link; class goes to the <li>
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  /** Marks this item as the current page; by default the last item is. */
  isCurrent?: boolean
  isDisabled?: boolean
}>()

const breadcrumbs = inject(breadcrumbsKey)!
const el = useTemplateRef<HTMLElement>('el')
let unregister: (() => void) | undefined
onMounted(() => (unregister = breadcrumbs.register(el.value!)))
onBeforeUnmount(() => unregister?.())

const current = computed(() => props.isCurrent || (el.value != null && breadcrumbs.current.value === el.value))
const slots = breadcrumbsVariants()
</script>

<template>
  <li ref="el" data-slot="breadcrumbs-item" :class="[slots.item(), $attrs.class]">
    <Link
      v-bind="{ ...$attrs, class: undefined }"
      :class="slots.link()"
      :is-disabled="isDisabled || current"
      :aria-current="current ? 'page' : undefined"
      :data-current="current || undefined"
    >
      <slot />
    </Link>
    <slot v-if="!current" name="separator">
      <IconChevronRight data-slot="breadcrumbs-separator" :class="slots.separator()" />
    </slot>
  </li>
</template>
