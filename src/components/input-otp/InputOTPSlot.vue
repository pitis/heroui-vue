<script setup lang="ts">
import { computed, inject } from 'vue'
import { inputOTPKey } from './context'

const props = defineProps<{ index: number }>()

const otp = inject(inputOTPKey)!
const state = computed(() => otp.slotState(props.index))
</script>

<template>
  <div
    data-slot="input-otp-slot"
    :class="otp.slots.slot()"
    :data-active="state.isActive || undefined"
    :data-filled="!!state.char || undefined"
    :data-disabled="otp.isDisabled || undefined"
    :data-invalid="otp.isInvalid || undefined"
  >
    <div v-if="state.char" data-slot="input-otp-slot-value" :class="otp.slots.slotValue()">
      {{ state.char }}
    </div>
    <div v-if="state.hasFakeCaret" data-slot="input-otp-caret" :class="otp.slots.caret()" />
  </div>
</template>
