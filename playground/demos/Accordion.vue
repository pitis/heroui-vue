<script setup lang="ts">
import { Accordion } from 'heroui-vue'
import { ref } from 'vue'

const items = [
  { id: 'account', title: 'Account', body: 'Manage your profile, email and password.' },
  { id: 'billing', title: 'Billing', body: 'Update your payment method and see invoices.' },
  { id: 'security', title: 'Security', body: 'Two-factor authentication and active sessions.' },
]
const expanded = ref(['account'])
</script>

<template>
  <div class="flex flex-wrap gap-8">
    <Accordion v-model:expanded-keys="expanded" class="w-80">
      <Accordion.Item v-for="item in items" :id="item.id" :key="item.id">
        <Accordion.Heading>
          <Accordion.Trigger>
            {{ item.title }}
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>{{ item.body }}</Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
    <Accordion variant="surface" allows-multiple-expanded class="w-80">
      <Accordion.Item v-for="item in items" :id="item.id" :key="item.id" :is-disabled="item.id === 'security'">
        <Accordion.Heading>
          <Accordion.Trigger>
            {{ item.title }}
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>{{ item.body }}</Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </div>
</template>
