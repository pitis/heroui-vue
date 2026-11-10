import type { Component } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'

// Smoke test: every playground demo mounts and unmounts without a Vue warning or error.
const demos = import.meta.glob<Component>('../playground/demos/*.vue', { import: 'default' })

test.each(Object.entries(demos))('%s mounts cleanly', async (_path, load) => {
  const demo = await load()
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const error = vi.spyOn(console, 'error').mockImplementation(() => {})
  const wrapper = mount(demo, { attachTo: document.body })
  await flushPromises()
  expect(wrapper.html()).not.toBe('')
  wrapper.unmount()
  expect(warn.mock.calls).toEqual([])
  expect(error.mock.calls).toEqual([])
  vi.restoreAllMocks()
})
