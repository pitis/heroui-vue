<script setup lang="ts">
import { Label, Meter, ProgressBar, ProgressCircle } from 'heroui-vue'
</script>

<template>
  <div class="flex max-w-sm flex-col gap-6">
    <Meter :value="72" color="success">
      <Label>Storage</Label>
      <Meter.Output />
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
    <Meter :value="18" :max-value="20" value-label="18 of 20 seats" color="warning" size="sm">
      <Label>Seats</Label>
      <Meter.Output />
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
    <ProgressBar :value="40">
      <Label>Uploading</Label>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
    <ProgressBar is-indeterminate color="default" size="lg">
      <Label>Loading…</Label>
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
    <div class="flex items-center gap-4">
      <ProgressCircle v-for="(size, i) in (['sm', 'md', 'lg'] as const)" :key="size" :size="size" :value="25 * (i + 1)" aria-label="Progress">
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
      <ProgressCircle is-indeterminate color="success" aria-label="Loading">
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
    </div>
  </div>
</template>
