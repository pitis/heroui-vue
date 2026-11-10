<script setup lang="ts">
import { Description, FieldError, Input, Label, TextField } from 'heroui-vue'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <div class="flex max-w-xs flex-col gap-4">
    <TextField is-required :is-invalid="email !== '' && !email.includes('@')">
      <Label is-required>
        Email
      </Label>
      <Input v-model="email" type="email" placeholder="you@example.com" />
      <Description>We never share it.</Description>
      <FieldError>Enter a valid email address.</FieldError>
    </TextField>
    <TextField is-disabled variant="secondary">
      <Label>Disabled</Label>
      <Input placeholder="Can't type here" />
    </TextField>
  </div>
</template>
