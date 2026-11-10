import type { VNodeChild } from 'vue'
import { shallowRef } from 'vue'

/** Text, or a render function for rich content: `() => h('b', 'Saved')`. */
export type Renderable = string | (() => VNodeChild)

export interface ToastContentValue {
  title?: Renderable
  description?: Renderable
  /** Replaces the variant's icon; `null` hides it. */
  indicator?: Renderable | null
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger'
  /** Props for an action Button; `children` is its label. */
  actionProps?: Record<string, unknown> & { children?: Renderable }
  isLoading?: boolean
}

export interface QueuedToast {
  key: string
  content: ToastContentValue
  /** Playing its exit animation; removed afterwards. */
  isExiting: boolean
}

interface Timer { remaining: number, startedAt: number, handle?: ReturnType<typeof setTimeout> }

export const DEFAULT_TOAST_TIMEOUT = 4000
export const DEFAULT_EXIT_DURATION = 300
export const DEFAULT_MAX_VISIBLE_TOAST = 3
export const DEFAULT_GAP = 12

let nextKey = 0

/** Toasts newest-first, with auto-dismiss timers that pause while the user hovers or focuses the region. */
export class ToastQueue {
  readonly toasts = shallowRef<QueuedToast[]>([])
  readonly maxVisibleToasts: number
  private readonly exitDuration: number
  private timers = new Map<string, Timer>()
  private onClose = new Map<string, () => void>()
  private paused = false

  constructor(options: { maxVisibleToasts?: number, exitDuration?: number } = {}) {
    this.maxVisibleToasts = options.maxVisibleToasts ?? DEFAULT_MAX_VISIBLE_TOAST
    this.exitDuration = options.exitDuration ?? DEFAULT_EXIT_DURATION
  }

  add(content: ToastContentValue, options: { timeout?: number, onClose?: () => void } = {}): string {
    const key = `toast-${++nextKey}`
    this.toasts.value = [{ key, content, isExiting: false }, ...this.toasts.value]
    if (options.onClose)
      this.onClose.set(key, options.onClose)
    this.startTimer(key, options.timeout ?? DEFAULT_TOAST_TIMEOUT)
    return key
  }

  update(key: string, content: ToastContentValue, options: { timeout?: number, onClose?: () => void } = {}): boolean {
    if (!this.toasts.value.some(toast => toast.key === key && !toast.isExiting))
      return false
    this.toasts.value = this.toasts.value.map(toast => (toast.key === key ? { ...toast, content } : toast))
    if (options.onClose)
      this.onClose.set(key, options.onClose)
    if ('timeout' in options)
      this.startTimer(key, options.timeout ?? DEFAULT_TOAST_TIMEOUT)
    return true
  }

  close(key: string) {
    if (!this.toasts.value.some(toast => toast.key === key && !toast.isExiting))
      return
    this.stopTimer(key)
    this.toasts.value = this.toasts.value.map(toast => (toast.key === key ? { ...toast, isExiting: true } : toast))
    this.onClose.get(key)?.()
    this.onClose.delete(key)
    setTimeout(() => (this.toasts.value = this.toasts.value.filter(toast => toast.key !== key)), this.exitDuration)
  }

  clear() {
    for (const toast of this.toasts.value)
      this.close(toast.key)
  }

  pauseAll() {
    this.paused = true
    for (const timer of this.timers.values()) {
      clearTimeout(timer.handle)
      timer.remaining -= Date.now() - timer.startedAt
    }
  }

  resumeAll() {
    this.paused = false
    for (const [key, timer] of this.timers)
      this.run(key, timer)
  }

  private startTimer(key: string, timeout: number) {
    this.stopTimer(key)
    if (timeout > 0) {
      const timer = { remaining: timeout, startedAt: Date.now() }
      this.timers.set(key, timer)
      if (!this.paused)
        this.run(key, timer)
    }
  }

  private run(key: string, timer: Timer) {
    timer.startedAt = Date.now()
    timer.handle = setTimeout(() => this.close(key), Math.max(0, timer.remaining))
  }

  private stopTimer(key: string) {
    clearTimeout(this.timers.get(key)?.handle)
    this.timers.delete(key)
  }
}

export interface ToastOptions {
  description?: Renderable
  indicator?: Renderable | null
  variant?: ToastContentValue['variant']
  actionProps?: ToastContentValue['actionProps']
  isLoading?: boolean
  /** ms before it closes by itself; 0 keeps it until closed. Default 4000. */
  timeout?: number
  onClose?: () => void
}

/** The imperative API: `toast('Saved')`, `toast.success(…)`, `toast.promise(…)`, `toast.close(id)`… */
export function createToastFunction(queue: ToastQueue) {
  const content = (message: Renderable, options?: ToastOptions): ToastContentValue => ({
    title: message,
    description: options?.description,
    indicator: options?.indicator,
    variant: options?.variant ?? 'default',
    actionProps: options?.actionProps,
    isLoading: options?.isLoading,
  })
  type Message = (message: Renderable, options?: Omit<ToastOptions, 'variant'>) => string

  const toast = Object.assign(
    (message: Renderable, options?: ToastOptions) => queue.add(content(message, options), { timeout: options?.timeout, onClose: options?.onClose }),
    {
      success: ((message, options) => toast(message, { ...options, variant: 'success' })) as Message,
      danger: ((message, options) => toast(message, { ...options, variant: 'danger' })) as Message,
      warning: ((message, options) => toast(message, { ...options, variant: 'warning' })) as Message,
      info: ((message, options) => toast(message, { ...options, variant: 'accent' })) as Message,
      /** Replaces a toast's content (adds it again if it already closed). */
      update(id: string, message: Renderable, options?: ToastOptions) {
        const updateOptions = { ...(options && 'timeout' in options ? { timeout: options.timeout } : {}), onClose: options?.onClose }
        return queue.update(id, content(message, options), updateOptions) ? id : queue.add(content(message, options), { timeout: options?.timeout, onClose: options?.onClose })
      },
      /** A loading toast that turns into a success or danger toast when the promise settles. */
      promise<T>(promise: Promise<T> | (() => Promise<T>), messages: { loading: Renderable, success: Renderable | ((data: T) => Renderable), error: Renderable | ((error: Error) => Renderable) }) {
        const id = queue.add(content(messages.loading, { isLoading: true }), { timeout: 0 })
        ;(typeof promise === 'function' ? promise() : promise).then(
          data => toast.update(id, typeof messages.success === 'function' && messages.success.length ? (messages.success as (data: T) => Renderable)(data) : messages.success as Renderable, { variant: 'success', timeout: DEFAULT_TOAST_TIMEOUT }),
          error => toast.update(id, typeof messages.error === 'function' && messages.error.length ? (messages.error as (error: Error) => Renderable)(error) : messages.error as Renderable, { variant: 'danger', timeout: DEFAULT_TOAST_TIMEOUT }),
        )
        return id
      },
      close: (key: string) => queue.close(key),
      clear: () => queue.clear(),
      pauseAll: () => queue.pauseAll(),
      resumeAll: () => queue.resumeAll(),
      getQueue: () => queue,
    },
  )
  return toast
}

/** The queue `toast()` writes to and `Toast.Provider` shows by default. */
export const toastQueue = new ToastQueue()
export const toast = createToastFunction(toastQueue)
