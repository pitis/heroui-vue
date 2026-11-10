<script setup lang="ts">
import { searchFieldVariants } from '@heroui/styles'
import { IconSearch } from '../icons'
</script>

<template>
  <IconSearch data-slot="search-field-search-icon" :class="searchFieldVariants().searchIcon()" />
</template>
