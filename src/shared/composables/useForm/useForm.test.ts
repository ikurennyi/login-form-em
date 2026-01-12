import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useForm } from './useForm'

describe('useForm', () => {
  let form: ReturnType<typeof useForm>

  beforeEach(() => {
    vi.useFakeTimers()
    form = useForm()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('initializes with default values', () => {
    expect(form.fields).toEqual({})
    expect(form.disabled).toBe(false)
    expect(form.responseError).toBe('')
  })

  it('initializes with provided fields', () => {
    const fields = { email: 'test@example.com' }
    form = useForm({ fields })
    expect(form.fields).toEqual(fields)
  })

  it('handles successful submit', async () => {
    const sender = vi.fn().mockResolvedValue(undefined)

    const promise = form.submit(sender)

    expect(form.disabled).toBe(true)

    await promise

    expect(sender).toHaveBeenCalledWith(form.fields)
    expect(form.disabled).toBe(false)
    expect(form.responseError).toBe('')
  })

  it('handles submit error', async () => {
    const errorMsg = 'Network Error'
    const sender = vi.fn().mockRejectedValue(new Error(errorMsg))

    await form.submit(sender)

    expect(form.disabled).toBe(false)
    expect(form.responseError).toBe(errorMsg)
  })

  it('clears error after 2 seconds', async () => {
    const sender = vi.fn().mockRejectedValue(new Error('Fail'))

    await form.submit(sender)
    expect(form.responseError).toBe('Fail')

    vi.advanceTimersByTime(2000)
    expect(form.responseError).toBe('')
  })
})
