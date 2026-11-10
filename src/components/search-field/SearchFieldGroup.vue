<script setup lang="ts">
import { inject, shallowRef } from 'vue'
import { fieldStateAttrs, useField } from '../../utils/field'
import { searchFieldKey } from './context'

const search = inject(searchFieldKey)!
const field = useField()
const focusWithin = shallowRef(false)
</script>

<template>
  <div
    role="group"
    data-slot="search-field-group"
    :class="search.slots.group()"
    :data-focus-within="focusWithin || undefined"
    v-bind="field ? fieldStateAttrs(field) : {}"
    @focusin="focusWithin = true"
    @focusout="focusWithin = false"
  >
    <slot />
  </div>
</template>
