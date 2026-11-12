import type { VNodeChild } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { AlertDialog, Autocomplete, Button, CloseButton, Disclosure, Drawer, ListBox, Modal, Popover, provideStrings, SearchField, Spinner } from 'heroui-vue'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { contains } from '../src/utils/filter'

// The parts and props heroui-vue adds on top of HeroUI's React API. Like the demo test, any Vue or Reka
// warning fails.
let warn: ReturnType<typeof vi.spyOn>
let error: ReturnType<typeof vi.spyOn>
beforeEach(() => {
  warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  error = vi.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => {
  expect(warn.mock.calls).toEqual([])
  expect(error.mock.calls).toEqual([])
  vi.restoreAllMocks()
  document.body.replaceChildren()
})

async function render(node: () => VNodeChild) {
  const wrapper = mount({ render: node }, { attachTo: document.body })
  await flushPromises()
  return wrapper
}

const modal = (Root: typeof Modal | typeof AlertDialog, description?: string) => () =>
  h(Root, { open: true }, () => h(Root.Backdrop, () => h(Root.Container, () => h(Root.Dialog, () => [
    h(Root.Header, () => [h(Root.Heading, () => 'Delete the file?'), description && h(Root.Description, () => description)]),
    h(Root.Body, () => 'Body'),
  ]))))

test('a Description describes its dialog', async () => {
  for (const Root of [Modal, AlertDialog]) {
    const wrapper = await render(modal(Root, 'It cannot be undone.'))
    const dialog = document.querySelector('[role="dialog"], [role="alertdialog"]')!
    const description = document.querySelector('[data-slot$="-description"]')!
    expect(description.textContent).toBe('It cannot be undone.')
    expect(dialog.getAttribute('aria-describedby')).toBe(description.id)
    wrapper.unmount()
  }
})

test('without a Description, a dialog has no aria-describedby (and Reka does not warn)', async () => {
  await render(modal(Modal))
  expect(document.querySelector('[role="dialog"]')!.hasAttribute('aria-describedby')).toBe(false)
})

test('Drawer.Description describes the drawer', async () => {
  await render(() => h(Drawer, { open: true }, () => h(Drawer.Backdrop, () => h(Drawer.Content, () => h(Drawer.Dialog, () =>
    h(Drawer.Header, () => [h(Drawer.Heading, () => 'Filters'), h(Drawer.Description, () => 'Narrow the list.')]))))))
  const description = document.querySelector('[data-slot="drawer-description"]')!
  expect(document.querySelector('[role="dialog"]')!.getAttribute('aria-describedby')).toBe(description.id)
})

test('Popover.Content passes Reka\'s events on: open-auto-focus can keep the focus where it is', async () => {
  const onOpenAutoFocus = vi.fn((event: Event) => event.preventDefault())
  await render(() => h(Popover, { open: true }, () => [
    h(Popover.Anchor, () => h('span', 'Art. 194')),
    h(Popover.Content, { onOpenAutoFocus }, () => h('p', 'Text')),
  ]))
  expect(onOpenAutoFocus).toHaveBeenCalledOnce()
})

test('Disclosure.Content with unmount-on-hide renders its content only while open', async () => {
  const wrapper = await render(() => h(Disclosure, null, () => [
    h(Disclosure.Heading, () => h(Disclosure.Trigger, () => 'More')),
    h(Disclosure.Content, { unmountOnHide: true }, () => h(Disclosure.Body, () => h('p', { id: 'heavy' }, 'Loaded'))),
  ]))
  expect(document.getElementById('heavy')).toBeNull()
  await wrapper.get('button').trigger('click')
  await nextTick()
  expect(document.getElementById('heavy')).not.toBeNull()
})

test('Disclosure.Trigger as-child makes its child the trigger', async () => {
  const wrapper = await render(() => h(Disclosure, null, () => [
    h(Disclosure.Trigger, { asChild: true }, () => h(Button, { variant: 'ghost' }, () => 'More')),
    h(Disclosure.Content, () => 'Content'),
  ]))
  const buttons = wrapper.findAll('button')
  expect(buttons).toHaveLength(1)
  expect(buttons[0]!.attributes('aria-expanded')).toBe('false')
  await buttons[0]!.trigger('click')
  expect(buttons[0]!.attributes('aria-expanded')).toBe('true')
})

test('Button as-child styles a link as the button; disabled, the link is inert', async () => {
  const onClick = vi.fn()
  const wrapper = await render(() => [
    h(Button, { asChild: true, variant: 'secondary' }, () => h('a', { href: '/cases', id: 'live' }, 'Cases')),
    h(Button, { asChild: true, isDisabled: true, onClick }, () => h('a', { href: '/cases', id: 'inert' }, 'Cases')),
  ])
  const live = wrapper.get('#live')
  expect(live.element.tagName).toBe('A')
  expect(live.classes()).toContain('button--secondary')
  expect(live.attributes('type')).toBeUndefined()
  const inert = wrapper.get('#inert')
  expect(inert.attributes('aria-disabled')).toBe('true')
  expect(inert.attributes('tabindex')).toBe('-1')
  await inert.trigger('click')
  expect(onClick).not.toHaveBeenCalled()
})

test('contains ignores case and accents', () => {
  expect(contains('Tribunalul București', 'bucuresti')).toBe(true)
  expect(contains('Curtea de Apel Iași', 'IASI')).toBe(true)
  expect(contains('Tribunalul Cluj', 'iasi')).toBe(false)
})

test('Autocomplete.Filter hides what does not match, by its default or a given filter', async () => {
  const courts = ['Tribunalul București', 'Curtea de Apel București', 'Tribunalul Cluj']
  const picker = (query: string, filter?: (text: string, input: string) => boolean) => () =>
    h(Autocomplete, { open: true }, () => [
      h(Autocomplete.Trigger, () => h(Autocomplete.Value)),
      h(Autocomplete.Popover, () => h(Autocomplete.Filter, { filter }, () => [
        h(SearchField, { 'aria-label': 'Search', 'modelValue': query }, () => h(SearchField.Group, () => h(SearchField.Input))),
        h(ListBox, () => courts.map(name => h(ListBox.Item, { id: name, key: name, textValue: name }, () => name))),
      ])),
    ])
  // an item's text is in it twice (the visible one, and Reka's hidden copy for the trigger)
  const shown = () => [...document.querySelectorAll('[data-slot="list-box-item"]:not([hidden])')].map(el => courts.find(c => el.textContent?.startsWith(c)))

  // the default: the typed text, ignoring case and accents
  let wrapper = await render(picker('bucuresti'))
  expect(shown()).toEqual(['Tribunalul București', 'Curtea de Apel București'])
  wrapper.unmount()

  // a given filter: every word, in any order
  const words = (text: string, input: string) => input.split(/\s+/).every(word => contains(text, word))
  wrapper = await render(picker('bucuresti tribunal', words))
  expect(shown()).toEqual(['Tribunalul București'])
  wrapper.unmount()
})

test('provideStrings relabels the parts heroui-vue labels itself; a nested call overrides only what it names', async () => {
  const parts = () => [h(Spinner), h(CloseButton)]
  const Provider = (strings: Parameters<typeof provideStrings>[0], child: () => VNodeChild) =>
    defineComponent({ setup() { provideStrings(strings); return child } })
  const labels = () => [...document.querySelectorAll('[data-slot="spinner"], [data-slot="close-button"]')].map(el => el.getAttribute('aria-label'))

  const english = await render(parts)
  expect(labels()).toEqual(['Loading', 'Close'])
  english.unmount()

  const Inner = Provider({ close: 'Închide' }, parts)
  await render(() => h(Provider({ loading: 'Se încarcă…', close: 'X' }, () => h(Inner))))
  expect(labels()).toEqual(['Se încarcă…', 'Închide'])
})
