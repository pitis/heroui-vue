<script setup lang="ts">
import { sheetVariants } from '@heroui/styles'
import { inject, onMounted, useTemplateRef, watch } from 'vue'
import { sheetKey } from './context'

const sheet = inject(sheetKey)!
const el = useTemplateRef<HTMLElement>('el')

const offscreen = () => ({ bottom: '0 100%', top: '0 -100%', left: '-100% 0', right: '100% 0' })[sheet.placement]
const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'

function slide(entering: boolean) {
  const node = el.value
  if (!node?.animate)
    return
  const frames = [{ translate: offscreen() }, { translate: '0 0' }]
  node.animate(entering ? frames : frames.reverse(), { duration: reduced() ? 1 : entering ? 300 : 200, easing: EASE, fill: entering ? 'none' : 'forwards' })
}

onMounted(() => {
  sheet.content = el.value
  slide(true)
})
watch(() => sheet.open, open => !open && slide(false))
</script>

<template>
  <!-- data-expanded: without snap points the sheet is always fully open, so its body may scroll -->
  <div
    ref="el"
    data-slot="sheet-content"
    :class="sheetVariants({ placement: sheet.placement }).content()"
    :data-placement="sheet.placement"
    :data-detached="sheet.isDetached || undefined"
    data-expanded=""
    style="position: relative; display: flex; flex-direction: column"
  >
    <slot />
  </div>
</template>
