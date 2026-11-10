import { meterVariants } from '@heroui/styles'
import { meterKey } from './context'
import MeterRoot from './Meter.vue'
import { rangePart } from './MeterPart'

export { meterVariants }

const MeterOutput = rangePart(meterKey, 'MeterOutput', 'span', 'meter-output', 'output', 'output')
const MeterTrack = rangePart(meterKey, 'MeterTrack', 'div', 'meter-track', 'track', 'plain')
const MeterFill = rangePart(meterKey, 'MeterFill', 'div', 'meter-fill', 'fill', 'fill')

const Meter = Object.assign(MeterRoot, { Root: MeterRoot, Output: MeterOutput, Track: MeterTrack, Fill: MeterFill })

export { Meter, MeterFill, MeterOutput, MeterRoot, MeterTrack }
