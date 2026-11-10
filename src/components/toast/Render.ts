import type { Renderable } from './queue'

/** Renders a toast message: plain text, or a render function's output. */
export const Render = (props: { value?: Renderable | null }) => (typeof props.value === 'function' ? props.value() : props.value)
Render.props = ['value']
