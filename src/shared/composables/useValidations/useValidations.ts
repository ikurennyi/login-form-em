import { ref, computed, watchEffect } from 'vue'
import { EMAIL_REGEX } from '@/shared/constants'

export type ValidationRule<T = unknown> = {
  validatorFn: (value: T) => boolean
  message: string
}

export type ValidationRules<T extends Record<string, unknown>> = {
  [K in keyof T]?: ValidationRule<T[K]>[]
}

export type ValidationErrors<T extends Record<string, unknown>> = {
  [k in keyof T]: string | null
}

export function useValidations<T extends Record<string, unknown>>(
  formData: T,
  rules: ValidationRules<T>,
) {
  const errors = ref<ValidationErrors<T>>(
    Object.fromEntries(Object.keys(formData).map((key) => [key, null])) as ValidationErrors<T>,
  )

  const validateField = (field: keyof T): boolean => {
    const fieldRules = rules[field]

    if (!fieldRules) {
      errors.value[field] = null
      return true
    }

    for (const rule of fieldRules) {
      const ruleValidator = rule.validatorFn(formData[field])
      if (!ruleValidator) {
        errors.value[field] = rule.message
        return false
      }
    }

    errors.value[field] = null
    return true
  }

  const validateForm = (): boolean => {
    return Object.keys(formData).reduce((isFormValid, key) => {
      const isFieldValid = validateField(key as keyof T)
      return isFormValid && isFieldValid
    }, true)
  }

  const hasErrors = computed(() => {
    return Object.values(errors.value).some((error) => error !== null)
  })

  const isFormValid = computed(() => !hasErrors.value)

  watchEffect(() => validateForm())

  return { errors, validateField, validateForm, isFormValid, hasErrors }
}

export const rules = {
  required: <T>(message: string): ValidationRule<T> => ({
    validatorFn: (value: T) => {
      if (typeof value === 'string') return value.trim().length > 0
      if (typeof value === 'boolean') return value === true
      if (Array.isArray(value)) return value.length > 0
      return value !== null && value !== undefined
    },
    message,
  }),
  email: (message: string): ValidationRule<string> => ({
    validatorFn: (value: string) => EMAIL_REGEX.test(value.trim()),
    message,
  }),
  minLength: (minLengthNumber: number, message?: string): ValidationRule<string> => ({
    validatorFn: (value: string) => value.trim().length >= minLengthNumber,
    message: message || `Length should be at least ${minLengthNumber} characters`,
  }),
  maxLength: (maxLengthNumber: number, message?: string): ValidationRule<string> => ({
    validatorFn: (value: string) => value.trim().length <= maxLengthNumber,
    message: message || `Length should be less or equal to ${maxLengthNumber} characters`,
  }),
}
