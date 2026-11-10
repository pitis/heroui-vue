<script setup lang="ts">
import { InputOTP, REGEXP_ONLY_DIGITS } from 'heroui-vue'
import { ref } from 'vue'

const code = ref('')
const completed = ref('')
</script>

<template>
  <div class="flex max-w-sm flex-col gap-6">
    <div class="flex flex-col gap-2">
      <InputOTP v-model="code" :max-length="6" :pattern="REGEXP_ONLY_DIGITS" aria-label="Verification code" @complete="completed = $event">
        <InputOTP.Group>
          <InputOTP.Slot v-for="i in 3" :key="i" :index="i - 1" />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot v-for="i in 3" :key="i" :index="i + 2" />
        </InputOTP.Group>
      </InputOTP>
      <p class="text-sm text-muted">
        Value: "{{ code }}" {{ completed && `· completed with ${completed}` }}
      </p>
    </div>
    <InputOTP :max-length="4" variant="secondary" is-invalid model-value="12">
      <InputOTP.Group>
        <InputOTP.Slot v-for="i in 4" :key="i" :index="i - 1" />
      </InputOTP.Group>
    </InputOTP>
    <InputOTP :max-length="4" is-disabled>
      <InputOTP.Group>
        <InputOTP.Slot v-for="i in 4" :key="i" :index="i - 1" />
      </InputOTP.Group>
    </InputOTP>
  </div>
</template>
