<script setup lang="ts">
import { Code, Header, Heading, Paragraph, Prose, Typography } from 'heroui-vue'
</script>

<template>
  <div class="flex max-w-xl flex-col gap-3">
    <Heading v-for="level in ([1, 2, 3, 4] as const)" :key="level" :level="level">
      Heading {{ level }}
    </Heading>
    <Paragraph>Body text, the default paragraph size.</Paragraph>
    <Paragraph size="sm">
      Small body text.
    </Paragraph>
    <Typography type="body-xs" color="muted" weight="medium">
      Extra small, muted, medium weight.
    </Typography>
    <Paragraph>Run <Code>pnpm add heroui-vue</Code> to install.</Paragraph>
    <Typography truncate class="w-48">
      This line is long enough that it gets truncated with an ellipsis.
    </Typography>
    <Header>A section header</Header>
    <Prose>
      <h3>Prose</h3>
      <p>Raw HTML, e.g. rendered markdown, picks up the <strong>typography scale</strong>.</p>
    </Prose>
  </div>
</template>
