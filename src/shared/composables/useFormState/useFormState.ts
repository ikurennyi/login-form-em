import { reactive } from 'vue'

export type FieldDetails = {
  blurred: boolean
  touched: boolean
}

export type FormState<T extends Record<string, unknown>> = {
  [K in keyof T]: FieldDetails
}

export function useFormState<T extends Record<string, unknown>>(fields: T) {
  const state = reactive<FormState<T>>(
    Object.keys(fields).reduce((acc, key) => {
      acc[key as keyof T] = {
        blurred: false,
        touched: false,
      }
      return acc
    }, {} as FormState<T>),
  )

  const onBlur = (field: keyof T) => {
    const fieldState = state as FormState<T>
    fieldState[field].blurred = true
  }

  const onInput = (field: keyof T) => {
    const fieldState = state as FormState<T>
    fieldState[field].touched = true
  }

  const handlers = Object.keys(fields).reduce(
    (acc, key) => {
      acc[key as keyof T] = {
        blur: () => onBlur(key as keyof T),
        input: () => onInput(key as keyof T),
      }
      return acc
    },
    {} as Record<keyof T, { blur: () => void; input: () => void }>,
  )

  return {
    state,
    handlers,
  }
}
