<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { useForm } from '@/shared/composables/useForm/useForm'
import { logIn } from '@/apis/api'

const form = useForm({
  fields: {
    email: '',
    password: '',
  },
})

const submitForm = async () => {
  await form.submit(async (fields) => {
    await logIn(fields)
  })
}

const emailInput = useTemplateRef('emailInput')
onMounted(() => emailInput?.value?.focus())
</script>

<template>
  <form @submit.prevent>
    <div class="form-controls">
      <div class="form-control">
        <label for="user_email">Your email</label>
        <input
          ref="emailInput"
          type="text"
          id="user_email"
          name="email"
          placeholder="Email"
          autocomplete="username"
          required
          :disabled="form.disabled"
          v-model.trim="form.fields.email"
        />
      </div>
      <div class="form-control">
        <label for="user_password">Your password</label>
        <input
          type="password"
          id="user_password"
          name="password"
          placeholder="Password"
          autocomplete="current-password"
          required
          :disabled="form.disabled"
          v-model.trim="form.fields.password"
        />
      </div>
    </div>

    <button type="submit" :disabled="form.disabled" @click="submitForm">Log in</button>
    <h2 v-html="form.responseError"></h2>
  </form>
</template>
