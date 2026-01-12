import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import LoginForm from './LoginForm.vue'
import { logIn } from '@/apis/api'

vi.mock('@/apis/api', () => ({
  logIn: vi.fn(),
}))

describe('LoginForm.vue', () => {
  let wrapper: VueWrapper<InstanceType<typeof LoginForm>>

  const email = 'test@example.com'
  const password = 'password123'

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = shallowMount(LoginForm)
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('disables submit button initially', () => {
    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('enables submit button when form is valid', async () => {
    const emailInput = wrapper.find('input[type="text"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await emailInput.setValue(email)
    await passwordInput.setValue(password)

    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('submits form with trimmed data', async () => {
    const emailInput = wrapper.find('input[type="text"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await emailInput.setValue(` ${email} `)
    await passwordInput.setValue(` ${password} `)

    await wrapper.find('form').trigger('submit')

    expect(logIn).toHaveBeenCalledWith({
      email,
      password,
    })
  })

  it('shows error state when invalid input is blurred', async () => {
    const emailInput = wrapper.find('input[type="text"]')
    await emailInput.trigger('blur')

    const fieldError = wrapper.findComponent({ name: 'FieldError' })

    expect(fieldError.exists()).toBe(true)
  })
})
