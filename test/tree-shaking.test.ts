// @vitest-environment node
import type { Rollup } from 'vite'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import { afterAll, beforeAll, expect, test } from 'vitest'

// An app that imports one component must not ship the others. The package is built here the way it
// is published (vite.config.ts), then a one-line app is bundled against that build, with the same
// dependencies left outside as the package leaves outside.
//
// What it guards: a component is put together at the top of its module (`Object.assign(Root, { … })`),
// a call a bundler cannot prove free of effects. Built into one file, every such call stayed in every
// app, and through them all of Reka UI: an app importing only Button, Card and Input shipped 580 kB
// it never ran. Built one file per module, with `sideEffects: false`, the modules nothing imports
// are never loaded.

const root = fileURLToPath(new URL('..', import.meta.url))
// Beside package.json, so the bundler reads its `sideEffects: false` for these files as it does for
// the installed package. Not under node_modules: a folder there is taken for a package of its own,
// one with no package.json, and everything in it is then kept.
const dist = mkdtempSync(`${root}.tree-shaking-`)
const external = [/^vue/, /^reka-ui/, /^@heroui\//, /^@internationalized\//, /^@vueuse\//, 'tailwind-variants']

beforeAll(async () => {
  await build({ root, logLevel: 'silent', build: { outDir: dist, emptyOutDir: true } })
}, 60_000)
afterAll(() => rmSync(dist, { recursive: true, force: true }))

/** What an app made of `source` is bundled into: its code, and what it still imports from outside. */
async function bundle(name: string, source: string) {
  const entry = `${dist}/${name}.app.js`
  writeFileSync(entry, source)
  const result = await build({
    root,
    configFile: false,
    logLevel: 'silent',
    build: { write: false, minify: false, lib: { entry, formats: ['es'] }, rollupOptions: { external } },
  })
  const [output] = result as Rollup.RollupOutput[]
  const chunk = output!.output[0]
  return { code: chunk.code, imports: chunk.imports, modules: Object.keys(chunk.modules) }
}

test('an app that imports Button ships Button, not the library', async () => {
  const all = await bundle('all', `import * as lib from './index.js'; console.log(lib)`)
  const one = await bundle('one', `import { Button } from './index.js'; console.log(Button)`)

  // the whole library reaches for the date library behind the calendars; Button alone must not
  expect(all.imports).toContain('@internationalized/date')
  expect(one.imports.sort()).toEqual(['@heroui/styles', 'reka-ui', 'vue'])
  expect(one.code.length).toBeLessThan(all.code.length / 50)

  // its own modules and the group context it reads, nothing from another component
  const components = new Set(one.modules.map(id => /\/components\/([^/]+)\//.exec(id)?.[1]).filter(Boolean))
  expect([...components].sort()).toEqual(['button', 'button-group'])
}, 60_000)

test('the built package exports what the source exports', async () => {
  const built = await import(/* @vite-ignore */ `${dist}/index.js`)
  const source = await import('../src/index')
  expect(Object.keys(built).sort()).toEqual(Object.keys(source).sort())
}, 60_000)
