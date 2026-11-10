<script setup lang="ts">
import type { QueuedToast } from './queue'
import { computed } from 'vue'
import { Spinner } from '../spinner'
import { Render } from './Render'
import Toast from './Toast.vue'
import ToastCloseButton from './ToastCloseButton.vue'
import ToastIndicator from './ToastIndicator.vue'
import { ToastActionButton, ToastContent, ToastDescription, ToastTitle } from './ToastParts'

// What Toast.Provider renders for a toast when no custom slot is given.
const props = defineProps<{ toast: QueuedToast }>()

const content = computed(() => props.toast.content)
const action = computed(() => {
  const { children, ...rest } = content.value.actionProps ?? {}
  return { children, rest }
})
</script>

<template>
  <Toast :toast="toast">
    <ToastIndicator v-if="content.isLoading">
      <Spinner color="current" size="sm" />
    </ToastIndicator>
    <ToastIndicator v-else-if="content.indicator">
      <Render :value="content.indicator" />
    </ToastIndicator>
    <ToastIndicator v-else-if="content.indicator !== null" />
    <ToastContent>
      <ToastTitle v-if="content.title">
        <Render :value="content.title" />
      </ToastTitle>
      <ToastDescription v-if="content.description">
        <Render :value="content.description" />
      </ToastDescription>
    </ToastContent>
    <ToastActionButton v-if="action.children" v-bind="action.rest">
      <Render :value="action.children" />
    </ToastActionButton>
    <ToastCloseButton />
  </Toast>
</template>
