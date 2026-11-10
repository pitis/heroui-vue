<script setup lang="ts">
import { Tabs } from 'heroui-vue'
import { ref } from 'vue'

const selected = ref('billing')
</script>

<template>
  <Tabs v-model="selected" class="w-full max-w-md">
    <Tabs.ListContainer>
      <Tabs.List aria-label="Settings">
        <Tabs.Tab id="account">
          Account
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab id="billing">
          Billing
          <Tabs.Indicator />
        </Tabs.Tab>
        <Tabs.Tab id="team" is-disabled>
          Team
          <Tabs.Indicator />
        </Tabs.Tab>
      </Tabs.List>
    </Tabs.ListContainer>
    <Tabs.Panel id="account">
      Account settings
    </Tabs.Panel>
    <Tabs.Panel id="billing">
      Billing settings
    </Tabs.Panel>
    <Tabs.Panel id="team">
      Team settings
    </Tabs.Panel>
  </Tabs>
</template>
