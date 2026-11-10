<script setup lang="ts">
import { Description, FieldError, Label, Radio, RadioGroup } from 'heroui-vue'
import { ref } from 'vue'

const plan = ref('pro')
const plans = [
  { value: 'free', label: 'Free', description: 'For trying things out' },
  { value: 'pro', label: 'Pro', description: '$12 per month' },
  { value: 'team', label: 'Team', description: 'Contact sales', disabled: true },
]
const shipping = ref<string>()
</script>

<template>
  <div class="flex flex-wrap gap-10">
    <RadioGroup v-model="plan" name="plan">
      <Label>Plan ({{ plan }})</Label>
      <Radio v-for="option in plans" :key="option.value" :value="option.value" :is-disabled="option.disabled">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Label>{{ option.label }}</Label>
        </Radio.Content>
        <Description>{{ option.description }}</Description>
      </Radio>
    </RadioGroup>

    <RadioGroup v-model="shipping" orientation="horizontal" variant="secondary" is-required :is-invalid="!shipping">
      <Label is-required>
        Shipping
      </Label>
      <Radio v-for="option in ['standard', 'express']" :key="option" :value="option">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Label>{{ option }}</Label>
        </Radio.Content>
      </Radio>
      <FieldError>Choose a shipping method.</FieldError>
    </RadioGroup>
  </div>
</template>
