<script setup lang="ts">
import { Pagination } from 'heroui-vue'
import { computed, ref } from 'vue'

const page = ref(4)
const total = 10
// first, last, and the current page with its neighbours; gaps become an ellipsis
const pages = computed(() => {
  const shown = [...new Set([1, page.value - 1, page.value, page.value + 1, total])].filter(p => p >= 1 && p <= total).sort((a, b) => a - b)
  return shown.flatMap((p, i) => (i && p - shown[i - 1]! > 1 ? ['…', p] : [p]))
})
</script>

<template>
  <Pagination>
    <Pagination.Summary>Page {{ page }} of {{ total }}</Pagination.Summary>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous :is-disabled="page === 1" @click="page--">
          <Pagination.PreviousIcon />
          Previous
        </Pagination.Previous>
      </Pagination.Item>
      <Pagination.Item v-for="(p, i) in pages" :key="i">
        <Pagination.Ellipsis v-if="p === '…'" />
        <Pagination.Link v-else :is-active="p === page" @click="page = p as number">
          {{ p }}
        </Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next :is-disabled="page === total" @click="page++">
          Next
          <Pagination.NextIcon />
        </Pagination.Next>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination>
  <Pagination size="sm">
    <Pagination.Content>
      <Pagination.Item v-for="p in 3" :key="p">
        <Pagination.Link :is-active="p === 1">
          {{ p }}
        </Pagination.Link>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination>
</template>
