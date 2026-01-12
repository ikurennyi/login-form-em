import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import App from './App.vue'
import LoginForm from './components/loginForm/LoginForm.vue'

describe('App.vue', () => {
  const createCmp = () => shallowMount(App)
  let wrapper: VueWrapper<InstanceType<typeof App>>

  beforeEach(() => {
    wrapper = createCmp()
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders LoginForm component', () => {
    expect(wrapper.findComponent(LoginForm).exists()).toBe(true)
  })
})
