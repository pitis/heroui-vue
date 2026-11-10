<script setup lang="ts">
import { Checkbox, CheckboxGroup, Description, FieldError, Label } from 'heroui-vue'
import { ref } from 'vue'

const accepted = ref(true)
const features = ref(['email'])
</script>

<template>
  <div class="flex flex-col gap-4">
    <Checkbox v-model="accepted">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>Accept terms ({{ accepted }})</Label>
      </Checkbox.Content>
      <Description>You can change this later.</Description>
    </Checkbox>

    <CheckboxGroup v-model="features" :is-invalid="features.length === 0">
      <Label>Notifications ({{ features.join(', ') || 'none' }})</Label>
      <Checkbox v-for="value in ['email', 'sms', 'push']" :key="value" :value="value" :is-disabled="value === 'push'">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>{{ value }}</Label>
        </Checkbox.Content>
      </Checkbox>
      <FieldError>Pick at least one.</FieldError>
    </CheckboxGroup>

    <Checkbox is-indeterminate>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Label>Indeterminate</Label>
      </Checkbox.Content>
    </Checkbox>
  </div>
</template>
