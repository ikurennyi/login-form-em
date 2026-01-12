import { describe, it, expect, beforeEach } from 'vitest'
import { reactive, nextTick } from 'vue'
import { useValidations, rules, type ValidationRule } from './useValidations'

describe('useValidations', () => {
  describe('rules', () => {
    describe('required', () => {
      let rule: ValidationRule<unknown>
      beforeEach(() => {
        rule = rules.required('Required')
      })

      it('validates string', () => {
        expect(rule.validatorFn('test')).toBe(true)
        expect(rule.validatorFn('')).toBe(false)
        expect(rule.validatorFn('   ')).toBe(false)
      })

      it('validates boolean', () => {
        expect(rule.validatorFn(true)).toBe(true)
        expect(rule.validatorFn(false)).toBe(false)
      })

      it('validates array', () => {
        expect(rule.validatorFn([1])).toBe(true)
        expect(rule.validatorFn([])).toBe(false)
      })

      it('validates null/undefined', () => {
        expect(rule.validatorFn(null)).toBe(false)
        expect(rule.validatorFn(undefined)).toBe(false)
        expect(rule.validatorFn(0)).toBe(true)
      })
    })

    describe('email format validation', () => {
      it.each([
        ['test@example.com', true],
        ['test+tag@example.com', true],
        ['invalid-email', false],
        ['test@', false],
      ])('for %s should be %s', (email, isValid) => {
        const rule = rules.email('Invalid email')
        expect(rule.validatorFn(email)).toBe(isValid)
      })
    })

    describe('minLength', () => {
      it.each([
        ['12345', true],
        ['1234', false],
      ])('for %s should be %s', (value, isValid) => {
        const rule = rules.minLength(5)
        expect(rule.validatorFn(value)).toBe(isValid)
      })
    })

    describe('maxLength', () => {
      it.each([
        ['12345', true],
        ['123456', false],
      ])('for %s should be %s', (value, isValid) => {
        const rule = rules.maxLength(5)
        expect(rule.validatorFn(value)).toBe(isValid)
      })
    })
  })

  describe('composable logic', () => {
    let formData: { name: string; pass: string }

    beforeEach(() => {
      formData = reactive({ name: '', pass: '' })
    })

    it('initializes with no errors', () => {
      const { errors, isFormValid } = useValidations(formData, {
        name: [rules.required('Required')],
      })

      expect(errors.value.name).toBe('Required')
      expect(isFormValid.value).toBe(false)
    })

    it('updates errors when data changes', async () => {
      const { errors, isFormValid } = useValidations(formData, {
        name: [rules.required('Required')],
      })

      expect(errors.value.name).toBe('Required')

      formData.name = 'Valid'
      await nextTick()

      expect(errors.value.name).toBe(null)
      expect(isFormValid.value).toBe(true)
    })

    it('validates multiple rules', async () => {
      const { errors } = useValidations(formData, {
        pass: [rules.required('Required'), rules.minLength(5, 'Too short')],
      })

      expect(errors.value.pass).toBe('Required')

      formData.pass = '123'
      await nextTick()
      expect(errors.value.pass).toBe('Too short')

      formData.pass = '12345'
      await nextTick()
      expect(errors.value.pass).toBe(null)
    })
  })
})
