<script setup lang="ts">
import { type SortDescriptor, Chip, Table } from 'heroui-vue'
import { computed, ref } from 'vue'

const people = [
  { id: 1, name: 'Ada Lovelace', role: 'Engineer', status: 'active', joined: '2021-03-01' },
  { id: 2, name: 'Grace Hopper', role: 'Admiral', status: 'away', joined: '2019-11-12' },
  { id: 3, name: 'Alan Turing', role: 'Researcher', status: 'active', joined: '2022-07-30' },
  { id: 4, name: 'Margaret Hamilton', role: 'Director', status: 'offline', joined: '2020-01-15' },
] as const
const columns = [
  { id: 'name', label: 'Name' },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'joined', label: 'Joined' },
] as const

const sort = ref<SortDescriptor>({ column: 'name', direction: 'ascending' })
const rows = computed(() => {
  const key = sort.value.column as keyof (typeof people)[number]
  const sorted = [...people].sort((a, b) => String(a[key]).localeCompare(String(b[key])))
  return sort.value.direction === 'ascending' ? sorted : sorted.reverse()
})
const statusColor = { active: 'success', away: 'warning', offline: 'default' } as const
</script>

<template>
  <Table>
    <Table.ScrollContainer>
      <Table.Content v-model:sort-descriptor="sort" aria-label="Team members">
        <Table.Header>
          <Table.Column v-for="column in columns" :id="column.id" :key="column.id" v-slot="{ sortDirection }" allows-sorting>
            <Table.SortableColumnHeader :sort-direction="sortDirection">
              {{ column.label }}
            </Table.SortableColumnHeader>
          </Table.Column>
        </Table.Header>
        <Table.Body>
          <Table.Row v-for="person in rows" :key="person.id">
            <Table.Cell>{{ person.name }}</Table.Cell>
            <Table.Cell>{{ person.role }}</Table.Cell>
            <Table.Cell>
              <Chip :color="statusColor[person.status]" size="sm" variant="soft">
                {{ person.status }}
              </Chip>
            </Table.Cell>
            <Table.Cell>{{ person.joined }}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
    <Table.Footer>{{ people.length }} members</Table.Footer>
  </Table>
  <Table variant="secondary">
    <Table.Content aria-label="Plain table">
      <Table.Header>
        <Table.Column>Plan</Table.Column>
        <Table.Column>Price</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Free</Table.Cell>
          <Table.Cell>$0</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Pro</Table.Cell>
          <Table.Cell>$12</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Content>
  </Table>
</template>
