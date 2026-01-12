import { describe, it, expect, vi, afterEach } from 'vitest'
import { logIn } from './api'

describe('logIn', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should throw "No backend" error', async () => {
    await expect(logIn({})).rejects.toThrow('No backend - no treasures! <br />  👻 boo!')
  })

  it('should log warning with fields', async () => {
    const consoleSpy = vi.spyOn(console, 'warn')
    const fields = { email: 'test@example.com', password: 'password' }

    try {
      await logIn(fields)
    } catch {}

    expect(consoleSpy).toHaveBeenCalledWith('[api::logIn] Form was sent with fields: ', fields)
  })

  it('should simulate delay', async () => {
    vi.useFakeTimers()
    const fields = { email: 'test@example.com' }
    const promise = logIn(fields)

    vi.advanceTimersByTime(700)

    await expect(promise).rejects.toThrow()
  })
})
