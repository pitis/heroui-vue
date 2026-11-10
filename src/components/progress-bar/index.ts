import { progressBarVariants } from '@heroui/styles'
import { progressBarKey } from '../meter/context'
import { rangePart } from '../meter/MeterPart'
import ProgressBarRoot from './ProgressBar.vue'

export { progressBarVariants }

const ProgressBarOutput = rangePart(progressBarKey, 'ProgressBarOutput', 'span', 'progress-bar-output', 'output', 'output')
const ProgressBarTrack = rangePart(progressBarKey, 'ProgressBarTrack', 'div', 'progress-bar-track', 'track', 'plain')
const ProgressBarFill = rangePart(progressBarKey, 'ProgressBarFill', 'div', 'progress-bar-fill', 'fill', 'fill')

const ProgressBar = Object.assign(ProgressBarRoot, { Root: ProgressBarRoot, Output: ProgressBarOutput, Track: ProgressBarTrack, Fill: ProgressBarFill })

export { ProgressBar, ProgressBarFill, ProgressBarOutput, ProgressBarRoot, ProgressBarTrack }
