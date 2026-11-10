<script setup lang="ts">
import { Button, Checkbox, Description, Fieldset, Form, Input, Label, Switch, TextArea, TextField } from 'heroui-vue'
import { ref } from 'vue'

const form = ref({ name: '', message: '', newsletter: true, terms: false })
const submitted = ref<string>()

function submit() {
  submitted.value = JSON.stringify(form.value)
}
</script>

<template>
  <Form class="max-w-md" @submit.prevent="submit">
    <Fieldset>
      <Fieldset.Legend>Contact us</Fieldset.Legend>
      <Description>We usually reply within a day.</Description>
      <Fieldset.Group>
        <TextField is-required>
          <Label is-required>
            Name
          </Label>
          <Input v-model="form.name" name="name" />
        </TextField>
        <TextField>
          <Label>Message</Label>
          <TextArea v-model="form.message" name="message" rows="3" />
        </TextField>
        <Switch v-model="form.newsletter" name="newsletter">
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Label>Subscribe to the newsletter</Label>
          </Switch.Content>
        </Switch>
        <Checkbox v-model="form.terms" name="terms" is-required>
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Label>I accept the terms</Label>
          </Checkbox.Content>
        </Checkbox>
      </Fieldset.Group>
      <Fieldset.Actions>
        <Button type="submit">
          Send
        </Button>
        <Button type="reset" variant="tertiary">
          Reset
        </Button>
      </Fieldset.Actions>
    </Fieldset>
    <p v-if="submitted" class="mt-4 text-sm text-muted">
      Submitted: {{ submitted }}
    </p>
  </Form>
</template>
