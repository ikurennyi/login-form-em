<script setup lang="ts">
import { onMounted, useTemplateRef, computed } from 'vue'
import { useFormState } from '@/shared/composables/useFormState/useFormState'
import { useForm } from '@/shared/composables/useForm/useForm'
import { useValidations, rules } from '@/shared/composables/useValidations/useValidations'
import FieldError from '@/shared/components/forms/FieldError.vue'
import { logIn } from '@/apis/api'

const form = useForm({
  fields: {
    email: '',
    password: '',
  },
})

const { state: formState, handlers } = useFormState(form.fields)

const { errors, isFormValid } = useValidations(form.fields, {
  email: [
    rules.required('Email is required'),
    rules.email('Please use valid email'),
    rules.maxLength(256),
  ],
  password: [
    rules.required('Password is required'),
    rules.minLength(8), // for the sake of simplicity
    rules.maxLength(256),
  ],
})

const isSubmitDisabled = computed(() => !isFormValid.value || form.isProcessing)

const submitButtonText = computed(() => (form.isProcessing ? 'Processing...' : 'Log in'))

const hasError = (field: keyof typeof form.fields): boolean => {
  return !!(errors.value[field] && (formState[field].blurred || formState[field].touched))
}

const emailInput = useTemplateRef('emailInput')
const focusEmail = () => emailInput.value?.focus()

const submitForm = async () => {
  await form
    .submit(async (fields) => {
      await logIn(fields)
    })
    .finally(focusEmail)
}

onMounted(() => focusEmail())
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-controls">
      <div class="form-control">
        <label for="user_email">Your email</label>
        <input
          ref="emailInput"
          type="text"
          id="user_email"
          name="email"
          placeholder="Email"
          autocomplete="email"
          required
          aria-describedby="email-error"
          :aria-invalid="hasError('email')"
          :disabled="form.isProcessing"
          v-model.trim="form.fields.email"
          v-on="handlers.email"
        />
        <field-error v-if="hasError('email')" :message="errors.email!" id="email-error" />
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
          aria-describedby="password-error"
          :aria-invalid="hasError('password')"
          :disabled="form.isProcessing"
          v-model.trim="form.fields.password"
          v-on="handlers.password"
        />
        <field-error v-if="hasError('password')" :message="errors.password!" id="password-error" />
      </div>
    </div>

    <button type="submit" :disabled="isSubmitDisabled">{{ submitButtonText }}</button>
    <h2 v-html="form.responseError"></h2>
  </form>
</template>
