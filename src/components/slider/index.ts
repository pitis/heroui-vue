import SliderRoot from './Slider.vue'
import SliderFill from './SliderFill.vue'
import SliderMark from './SliderMark.vue'
import SliderMarks from './SliderMarks.vue'
import SliderOutput from './SliderOutput.vue'
import SliderSteps from './SliderSteps.vue'
import SliderThumb from './SliderThumb.vue'
import SliderTrack from './SliderTrack.vue'

export { sliderVariants } from '@heroui/styles'

const Slider = Object.assign(SliderRoot, {
  Root: SliderRoot,
  Output: SliderOutput,
  Track: SliderTrack,
  Fill: SliderFill,
  Thumb: SliderThumb,
  Steps: SliderSteps,
  Marks: SliderMarks,
  Mark: SliderMark,
})

export { Slider, SliderFill, SliderMark, SliderMarks, SliderOutput, SliderRoot, SliderSteps, SliderThumb, SliderTrack }
