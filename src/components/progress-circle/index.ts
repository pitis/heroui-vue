import ProgressCircleRoot from './ProgressCircle.vue'
import { ProgressCircleFillCircle, ProgressCircleTrack, ProgressCircleTrackCircle } from './parts'

export { progressCircleVariants } from '@heroui/styles'

const ProgressCircle = Object.assign(ProgressCircleRoot, {
  Root: ProgressCircleRoot,
  Track: ProgressCircleTrack,
  TrackCircle: ProgressCircleTrackCircle,
  FillCircle: ProgressCircleFillCircle,
})

export { ProgressCircle, ProgressCircleFillCircle, ProgressCircleRoot, ProgressCircleTrack, ProgressCircleTrackCircle }
