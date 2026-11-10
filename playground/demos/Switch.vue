<script setup lang="ts">
import { Description, Label, Switch, SwitchGroup } from 'heroui-vue'
import { ref } from 'vue'

const wifi = ref(true)
const settings = ref({ email: true, sms: false, push: false })
</script>

<template>
  <div class="flex flex-col gap-6">
    <Switch v-model="wifi">
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Label>Wi-Fi ({{ wifi ? 'on' : 'off' }})</Label>
      </Switch.Content>
      <Description>Connect to known networks automatically.</Description>
    </Switch>

    <SwitchGroup>
      <Switch v-for="(_, key) in settings" :key="key" v-model="settings[key]" :is-disabled="key === 'push'" size="sm">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>{{ key }}</Label>
        </Switch.Content>
      </Switch>
    </SwitchGroup>

    <div class="flex gap-4">
      <Switch v-for="size in (['sm', 'md', 'lg'] as const)" :key="size" :size="size" :model-value="true">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>{{ size }}</Label>
        </Switch.Content>
      </Switch>
    </div>
  </div>
</template>
