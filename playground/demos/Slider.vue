<script setup lang="ts">
import { Label, Slider } from 'heroui-vue'
import { ref } from 'vue'

const volume = ref(30)
const price = ref([20, 80])
const rating = ref(3)
</script>

<template>
  <div class="flex flex-wrap gap-10">
    <div class="flex w-72 flex-col gap-8">
      <Slider v-model="volume">
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
      <Slider v-model="price" :format-options="{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }">
        <Label>Price range</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
      <Slider v-model="rating" :min-value="1" :max-value="5">
        <Label>Rating</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Steps />
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
        <Slider.Marks>
          <Slider.Mark v-for="n in 5" :key="n" :value="n" />
        </Slider.Marks>
      </Slider>
      <Slider :model-value="60" is-disabled>
        <Label>Disabled</Label>
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
    </div>
    <Slider v-model="volume" orientation="vertical" class="h-48">
      <Label>Vertical</Label>
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  </div>
</template>
