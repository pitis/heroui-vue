<script setup lang="ts">
import { Description, FieldError, Header, Label, ListBox, Select } from 'heroui-vue'
import { ref } from 'vue'

const country = ref<string>()
const toppings = ref<string[]>(['cheese'])
</script>

<template>
  <div class="flex flex-wrap gap-8">
    <Select v-model="country" placeholder="Choose a country" class="w-64" is-required :is-invalid="country === 'mars'">
      <Label is-required>
        Country
      </Label>
      <Select.Trigger>
        <Select.Value />
        <Select.ClearButton />
        <Select.Indicator />
      </Select.Trigger>
      <Description>Where we ship your order.</Description>
      <FieldError>We don't ship to Mars yet.</FieldError>
      <Select.Popover>
        <ListBox>
          <ListBox.Section>
            <Header>Europe</Header>
            <ListBox.Item v-for="c in ['Austria', 'France', 'Germany']" :id="c.toLowerCase()" :key="c">
              {{ c }}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
          <ListBox.Section>
            <Header>Elsewhere</Header>
            <ListBox.Item id="japan">
              Japan
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="mars">
              Mars
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="atlantis" is-disabled>
              Atlantis
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox.Section>
        </ListBox>
      </Select.Popover>
    </Select>

    <Select v-model="toppings" selection-mode="multiple" variant="secondary" class="w-64">
      <Label>Toppings</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item v-for="t in ['cheese', 'olives', 'basil', 'mushrooms']" :id="t" :key="t">
            {{ t }}
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  </div>
</template>
