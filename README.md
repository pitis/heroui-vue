# heroui-vue

[HeroUI v3](https://heroui.com) components for Vue 3.

- **Styling** is the official [`@heroui/styles`](https://www.npmjs.com/package/@heroui/styles) package, unmodified. Every component renders the same classes, `data-slot`s and state attributes as `@heroui/react` 3.2.7, so HeroUI's themes, CSS variables and class overrides work unchanged.
- **Behaviour and accessibility** come from [Reka UI](https://reka-ui.com) (the Vue counterpart of the React Aria layer HeroUI uses): keyboard navigation, focus management, ARIA, dismissal, positioning.
- **Version**: 3.2.7 is the port of `@heroui/react` 3.2.7; 3.2.8 adds the Vue-only parts below on top of it, and 3.2.8.1 fixes on top of 3.2.8 (a fourth number, so the first three keep naming the React release). All pin `@heroui/styles` 3.2.7.
- **API**: HeroUI's component and prop names (`<Card.Header>`, `variant`, `isDisabled`…), adapted to Vue idioms (`v-model`, slots, events).

## Setup

```sh
# prebuilt package from the GitHub release (see Releases for newer versions)
pnpm add https://github.com/pitis/heroui-vue/releases/download/v3.2.8.1/heroui-vue-3.2.8.1.tgz @heroui/styles@3.2.7 reka-ui @internationalized/date
pnpm add -D tailwindcss @tailwindcss/vite
```

```css
/* main.css */
@import "tailwindcss";
@import "@heroui/styles";
```

```vue
<script setup lang="ts">
import { Button, Card } from 'heroui-vue'
</script>

<template>
  <Card>
    <Card.Header>
      <Card.Title>Hello</Card.Title>
    </Card.Header>
    <Card.Footer>
      <Button variant="secondary" @click="save">Save</Button>
    </Card.Footer>
  </Card>
</template>
```

Every component is exported both as a compound object (`Card`, with `Card.Header`, `Card.Title`…) and as flat names (`CardHeader`, `CardTitle`…). Each folder also re-exports the matching `xxxVariants` function from `@heroui/styles`.

## Differences from `@heroui/react`

| React | Vue |
| --- | --- |
| `value` + `onChange`, `selectedKey(s)` + `onSelectionChange`, `isSelected` | `v-model` (`v-model:open`, `v-model:expanded`, `v-model:expandedKeys`, `v-model:sortDescriptor` where React has those) |
| `onPress`, `onAction`, `onRemove`… | native events (`@click`) or component events (`@action`, `@remove`, `@change-end`, `@complete`) |
| Render-prop children `{(state) => …}` | default-slot props: `<Checkbox v-slot="{ isSelected }">` |
| Collection render functions: `<Calendar.GridBody>{(date) => …}</…>` | scoped slots `<Calendar.GridBody v-slot="{ date }">`; omit the slot for the default rendering |
| `<Button>` placed directly in `<Popover>`, `<Modal>`, `<Tooltip>`, `<Dropdown>`, `<AlertDialog>`, `<Drawer>` | wrap it: `<Popover.Trigger as-child><Button>Open</Button></Popover.Trigger>` |
| `<Sheet>` children use `<Sheet.Trigger>` around a button | same, `<Sheet.Trigger><Button /></Sheet.Trigger>` |
| `TextField` holds the value | the control holds it: `<TextField><Input v-model="name" /></TextField>` (same for `TextArea`, `InputGroup.Input`) |
| `ComboBox` `inputValue` | the `Input` inside: `<Input v-model="query" />`; the selection is `ComboBox`'s `v-model` |
| Item keys: `id` | `id` (the value in the picker's `v-model`) |
| Dates: `@internationalized/date` values | the same values |
| Colors: `parseColor('#f00')` objects | hex/CSS strings or Reka color objects; Reka's helpers (`parseColor`, `colorToString`…) are re-exported |
| `toast()` content: `ReactNode` | a string or a render function `() => h(…)` |

Picker composition is unchanged: a `ListBox` placed in `Select.Popover`, `ComboBox.Popover` or `Autocomplete.Filter` becomes that picker's list; a `Calendar` in `DatePicker.Popover` edits the picker's value; color components inside a `ColorPicker` share its color.

## Vue-only additions

Not in `@heroui/react`; each fills a gap the React version covers some other way.

| Addition | What for |
| --- | --- |
| `Modal.Description`, `AlertDialog.Description`, `Drawer.Description`, `Sheet.Description` | The dialog's accessible description (`aria-describedby`, read with the heading). Without one the dialog has none, as before. |
| `Popover.Anchor`; `Popover.Content` passes on Reka's events (`@open-auto-focus`, `@escape-key-down`, `@pointer-down-outside`…) | Position the popover against an element that is not its trigger (one opened on hover, say), and keep the focus where it is when it opens. |
| `unmount-on-hide` on `Disclosure.Content` / `Accordion.Panel` | React Aria keeps a closed panel in the DOM, hidden; with this the content renders only while open, for content that is heavy or loads data. |
| `as-child` on `Button` and `Disclosure.Trigger` | A `RouterLink` or `<a>` styled as a button (disabled, it gets `aria-disabled` and leaves the Tab order); your own `Button` as a disclosure's trigger. |
| `filter` on `Autocomplete.Filter`: `(textValue, inputValue) => boolean` | React Aria's `filter`. The default ignores case and accents (React Aria's `useFilter({ sensitivity: 'base' }).contains`), so "bucuresti" finds "București". |
| `provideStrings({ close, closeNotification, notifications, clearSearch, removeTag, showSuggestions, loading, year })` | The labels heroui-vue writes itself (icon-only buttons, the spinner, the toast region, the year grid), which React Aria takes from the locale. English by default; call it once near the app's root, in any part a `provide` reaches. |

## Not ported

Each of these is marked `shortcut:` in the source where it would go.

- **Table**: a semantic `<table>` with sortable columns. No grid keyboard navigation, row selection, column resizing (`Table.ResizableContainer`, `Table.ColumnResizer`), load-more collections or virtualization.
- **Sheet**: no snap points and no nested-sheet stacking (`Sheet.NestedRoot` is a plain sheet). Edge layout, slide in/out, backdrop, drag-to-dismiss from the handle and dialog behaviour are ported.
- **Calendar**: month view only (no `visibleDuration` week/day views).
- **Tabs**: no overflow scroller/chevrons around a long tab list.
- **Tooltip**: no close delay.
- **ComboBox**: no `ComboBox.Value` part.
- **Toolbar**, **standalone Menu**: every control is in the Tab order (no roving tabindex); arrow keys still move between them. Menus inside a `Dropdown` use Reka's full keyboard model.
- **Slider/ColorSlider**: thumb centring assumes left-to-right layouts.
- React-only exports (`Pressable`, `Focusable`, `RouterProvider`, `I18nProvider`, `Virtualizer`, the `*_CHILD` markers). For locale and direction, use Reka's `ConfigProvider`.

## Development

```sh
pnpm dev        # playground with a demo per component (playground/demos); ?only=Select,Modal shows just those
pnpm test       # mounts every demo and fails on any Vue warning; unit tests for the toast queue
pnpm typecheck
pnpm build      # dist/index.js + type declarations
```

Releasing: bump `version` in `package.json`, commit, then

```sh
pnpm build && pnpm pack && gh release create v<version> heroui-vue-<version>.tgz --generate-notes
```

`src/utils/bridge.ts` is the core: the element each Reka part renders through, which translates Reka's state attributes (`data-state="checked"`, `data-side`…) into the React Aria ones `@heroui/styles` selects on (`data-selected="true"`, `data-placement`, `data-entering`/`data-exiting`…).

## License

MIT (see `LICENSE`). Ported from [HeroUI](https://heroui.com) (`@heroui/react`), Apache-2.0, Copyright 2025 NextUI Inc.: see `NOTICE` and `LICENSE-APACHE`.
