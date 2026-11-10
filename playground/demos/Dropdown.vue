<script setup lang="ts">
import { Button, Description, Dropdown, Header, Label, Menu, Separator } from 'heroui-vue'
import { ref } from 'vue'

const last = ref('')
const sort = ref('date')
const columns = ref<string[]>(['name', 'size'])
</script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <Dropdown>
      <Dropdown.Trigger as-child>
        <Button variant="secondary">
          Actions
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu @action="last = $event">
          <Dropdown.Section>
            <Header>File</Header>
            <Dropdown.Item id="new">
              <Label>New file</Label>
              <Description>Create an empty file</Description>
            </Dropdown.Item>
            <Dropdown.Item id="copy">
              Copy link
            </Dropdown.Item>
            <Dropdown.Item id="locked" is-disabled>
              Locked
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.SubmenuTrigger>
            <Dropdown.Item id="share">
              Share
              <Dropdown.SubmenuIndicator />
            </Dropdown.Item>
            <Dropdown.Popover>
              <Dropdown.Menu @action="last = $event">
                <Dropdown.Item id="email">
                  Email
                </Dropdown.Item>
                <Dropdown.Item id="slack">
                  Slack
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.SubmenuTrigger>
          <Dropdown.Item id="delete" variant="danger">
            <Label>Delete</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>

    <Dropdown>
      <Dropdown.Trigger as-child>
        <Button variant="secondary">
          Sort: {{ sort }}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu v-model="sort" selection-mode="single">
          <Dropdown.Item v-for="key in ['date', 'name', 'size']" :id="key" :key="key">
            <Dropdown.ItemIndicator type="dot" />
            {{ key }}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>

    <Dropdown>
      <Dropdown.Trigger as-child>
        <Button variant="secondary">
          Columns ({{ columns.length }})
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu v-model="columns" selection-mode="multiple">
          <Dropdown.Item v-for="key in ['name', 'size', 'owner', 'modified']" :id="key" :key="key">
            <Dropdown.ItemIndicator />
            {{ key }}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>

    <Menu aria-label="Standalone menu" class="w-48 rounded-2xl bg-overlay p-1.5" @action="last = $event">
      <Menu.Item id="profile">
        Profile
      </Menu.Item>
      <Menu.Item id="settings">
        Settings
      </Menu.Item>
      <Menu.Item id="logout" variant="danger">
        Log out
      </Menu.Item>
    </Menu>
  </div>
  <p class="text-sm text-muted">
    Last action: {{ last || 'none' }}
  </p>
</template>
