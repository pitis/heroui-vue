import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { createToastFunction, ToastQueue } from '../src/components/toast/queue'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

const titles = (queue: ToastQueue) => queue.toasts.value.map(t => `${t.content.title}${t.isExiting ? ' (exiting)' : ''}`)

test('newest first; auto-dismiss, exit phase, then removal', () => {
  const queue = new ToastQueue({ exitDuration: 300 })
  const toast = createToastFunction(queue)
  toast('a')
  toast.success('b', { timeout: 1000 })
  expect(titles(queue)).toEqual(['b', 'a'])
  vi.advanceTimersByTime(1000)
  expect(titles(queue)).toEqual(['b (exiting)', 'a'])
  vi.advanceTimersByTime(300)
  expect(titles(queue)).toEqual(['a'])
})

test('pauseAll keeps the remaining time; resumeAll continues it', () => {
  const queue = new ToastQueue({ exitDuration: 0 })
  queue.add({ title: 'a' }, { timeout: 1000 })
  vi.advanceTimersByTime(600)
  queue.pauseAll()
  vi.advanceTimersByTime(5000)
  expect(titles(queue)).toEqual(['a'])
  queue.resumeAll()
  vi.advanceTimersByTime(399)
  expect(titles(queue)).toEqual(['a'])
  vi.advanceTimersByTime(1)
  expect(titles(queue)).toEqual(['a (exiting)'])
})

test('timeout 0 is sticky; close calls onClose once', () => {
  const queue = new ToastQueue()
  const onClose = vi.fn()
  const key = queue.add({ title: 'a' }, { timeout: 0, onClose })
  vi.advanceTimersByTime(60_000)
  expect(titles(queue)).toEqual(['a'])
  queue.close(key)
  queue.close(key)
  expect(onClose).toHaveBeenCalledOnce()
})

test('promise: loading, then success content with a timeout', async () => {
  const queue = new ToastQueue()
  const toast = createToastFunction(queue)
  let resolve!: (v: string) => void
  toast.promise(new Promise<string>(r => (resolve = r)), { loading: 'Saving', success: (name: string) => `Saved ${name}`, error: 'Failed' })
  expect(queue.toasts.value[0]?.content).toMatchObject({ title: 'Saving', isLoading: true })
  resolve('file')
  await vi.runAllTicks()
  await Promise.resolve()
  expect(queue.toasts.value[0]?.content).toMatchObject({ title: 'Saved file', variant: 'success', isLoading: undefined })
})
