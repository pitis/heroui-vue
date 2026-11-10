<script setup lang="ts">
import { Description, FieldError, Label, TextArea, TextField } from 'heroui-vue'
import { ref } from 'vue'

const bio = ref('')
</script>

<template>
  <div class="flex max-w-sm flex-col gap-4">
    <TextField :is-invalid="bio.length > 80">
      <Label>Bio</Label>
      <TextArea v-model="bio" rows="3" placeholder="Tell us about yourself" />
      <Description>{{ bio.length }}/80 characters</Description>
      <FieldError>Keep it under 80 characters.</FieldError>
    </TextField>
    <TextField variant="secondary" is-disabled>
      <Label>Disabled</Label>
      <TextArea placeholder="Read only" />
    </TextField>
  </div>
</template>
