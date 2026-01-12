import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import FieldError from './FieldError.vue'

describe('FieldError.vue', () => {
  let wrapper: VueWrapper<InstanceType<typeof FieldError>>

  const createCmp = (message = 'Error message') =>
    shallowMount(FieldError, {
      props: { message, id: 'error-id' },
    })

  beforeEach(() => (wrapper = createCmp()))

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders message prop correctly', () => {
    const message = 'Something went wrong'
    wrapper = createCmp(message)
    expect(wrapper.text()).toContain(message)
  })
})
