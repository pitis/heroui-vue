import { defineComponent, h, inject } from 'vue'
import { progressCircleKey } from '../meter/context'

const STROKE_WIDTH = 4
const CENTER = 18
const RADIUS = CENTER - STROKE_WIDTH / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const circle = { cx: CENTER, cy: CENTER, r: RADIUS, 'stroke-width': STROKE_WIDTH }

export const ProgressCircleTrack = defineComponent({
  name: 'ProgressCircleTrack',
  setup(_, { slots }) {
    const ctx = inject(progressCircleKey)!
    return () => h('svg', { 'class': ctx.value.slots.track!(), 'data-slot': 'progress-circle-track', 'fill': 'none', 'viewBox': `0 0 ${CENTER * 2} ${CENTER * 2}` }, slots.default?.())
  },
})

export const ProgressCircleTrackCircle = defineComponent({
  name: 'ProgressCircleTrackCircle',
  setup() {
    const ctx = inject(progressCircleKey)!
    return () => h('circle', { ...circle, 'class': ctx.value.slots.trackCircle!(), 'data-slot': 'progress-circle-track-circle' })
  },
})

export const ProgressCircleFillCircle = defineComponent({
  name: 'ProgressCircleFillCircle',
  setup() {
    const ctx = inject(progressCircleKey)!
    return () => {
      const { slots, percentage, isIndeterminate } = ctx.value
      return h('circle', {
        ...circle,
        'class': slots.fillCircle!(),
        'data-slot': 'progress-circle-fill-circle',
        'stroke-dasharray': CIRCUMFERENCE,
        // indeterminate: a quarter arc that the CSS spins
        'stroke-dashoffset': isIndeterminate ? CIRCUMFERENCE * 0.75 : CIRCUMFERENCE - percentage / 100 * CIRCUMFERENCE,
        'stroke-linecap': 'round',
        'transform': `rotate(-90 ${CENTER} ${CENTER})`,
      })
    }
  },
})
