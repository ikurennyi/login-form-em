import { describe, it, expect } from 'vitest'
import { useFormState } from './useFormState'

describe('useFormState', () => {
  it('initializes state correctly', () => {
    const fields = { email: '', password: '' }
    const { state } = useFormState(fields)

    expect(state.email).toEqual({ blurred: false, touched: false })
    expect(state.password).toEqual({ blurred: false, touched: false })
  })

  it('generates handlers for each field', () => {
    const fields = { email: '' }
    const { handlers } = useFormState(fields)

    expect(handlers.email).toBeDefined()
    expect(typeof handlers.email.blur).toBe('function')
    expect(typeof handlers.email.input).toBe('function')
  })

  it('updates state on blur', () => {
    const fields = { email: '' }
    const { state, handlers } = useFormState(fields)

    handlers.email.blur()

    expect(state.email.blurred).toBe(true)
    expect(state.email.touched).toBe(false)
  })

  it('updates state on input', () => {
    const fields = { email: '' }
    const { state, handlers } = useFormState(fields)

    handlers.email.input()

    expect(state.email.touched).toBe(true)
    expect(state.email.blurred).toBe(false)
  })
})
