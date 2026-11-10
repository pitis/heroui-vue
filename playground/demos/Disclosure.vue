<script setup lang="ts">
import { Disclosure, DisclosureGroup } from 'heroui-vue'
import { ref } from 'vue'

const open = ref(false)
const expanded = ref(['shipping'])
const faqs = [
  { id: 'shipping', q: 'How long does shipping take?', a: 'Orders ship within two business days.' },
  { id: 'returns', q: 'Can I return an item?', a: 'Yes, within 30 days of delivery.' },
]
</script>

<template>
  <div class="flex max-w-md flex-col gap-6">
    <Disclosure v-model:expanded="open">
      <Disclosure.Heading>
        <Disclosure.Trigger class="flex w-full items-center justify-between">
          System requirements ({{ open ? 'open' : 'closed' }})
          <Disclosure.Indicator />
        </Disclosure.Trigger>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body>Vue 3.5+, Tailwind CSS v4 and a modern browser.</Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>

    <DisclosureGroup v-model:expanded-keys="expanded">
      <Disclosure v-for="faq in faqs" :id="faq.id" :key="faq.id">
        <Disclosure.Heading>
          <Disclosure.Trigger class="flex w-full items-center justify-between">
            {{ faq.q }}
            <Disclosure.Indicator />
          </Disclosure.Trigger>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body>{{ faq.a }}</Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    </DisclosureGroup>
  </div>
</template>
