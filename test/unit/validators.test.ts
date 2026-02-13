import { describe, it, expect } from 'vitest'
import {
  isValidEmail,
  isValidPassword,
  isNotEmpty,
  getEmailError,
  getPasswordError,
  validateLoginForm,
  hasErrors
} from '~/types-and-utils/validators'

describe('validators', () => {

  // isValidEmail
  describe('isValidEmail', () => {
    it('Email válido -> Devuelve true', () => {
      expect(isValidEmail('usuario@email.com')).toBe(true)
      expect(isValidEmail('user.cristina@domain.es')).toBe(true)
      expect(isValidEmail('user_+09@email.org')).toBe(true)
    })

    it('Email inválido -> Devuelve false', () => {
      expect(isValidEmail('emailnovalido')).toBe(false)
      expect(isValidEmail('no@dominio')).toBe(false)
      expect(isValidEmail('@sinusuario.com')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  // isValidPassword
  describe('isValidPassword', () => {
    it('La contraseña tiene 6 o más caracteres -> Devuelve true', () => {
      expect(isValidPassword('12345678')).toBe(true)
      expect(isValidPassword('contraseñasegura35')).toBe(true)
    })

    it('La contraseña tiene menos de 6 caracteres -> Devuelve false', () => {
      expect(isValidPassword('12345')).toBe(false)
      expect(isValidPassword('')).toBe(false)
      expect(isValidPassword('abc')).toBe(false)
    })
  })

  // isNotEmpty
  describe('isNotEmpty', () => {
    it('Si el valor no está vacío  -> Devuelve true', () => {
      expect(isNotEmpty('texto')).toBe(true)
      expect(isNotEmpty('  123  ')).toBe(true)
    })

    it('Si el valor está vacío -> Devuelve false', () => {
      expect(isNotEmpty('')).toBe(false)
      expect(isNotEmpty('   ')).toBe(false)
    })
  })

  // getEmailError
  describe('getEmailError', () => {
    it('Si el email está vacío  -> Devuelve error', () => {
      expect(getEmailError('')).toBe('El email es obligatorio')
    })

    it('Si el formato del email es inválido -> Devuelve error', () => {
      expect(getEmailError('noesvalido')).toBe('El formato del email no es válido')
    })

    it('Si el email es válido -> Devuelve string vacío', () => {
      expect(getEmailError('test@example.com')).toBe('')
    })
  })

  // getPasswordError
  describe('getPasswordError', () => {
    it('Si la contraseña está vacía -> Devuelve error', () => {
      expect(getPasswordError('')).toBe('La contraseña es obligatoria')
    })

    it('Si la contraseña es muy corta -> Devuelve error', () => {
      expect(getPasswordError('123')).toBe('La contraseña debe tener más de 6 caracteres')
    })

    it('Si la contraseña es válida -> Devuelve string vacío', () => {
      expect(getPasswordError('contraseña12')).toBe('')
    })
  })

  // validateLoginForm
  describe('validateLoginForm', () => {
    it('Si email y contraseña son inválidos -> Devuelve error', () => {
      const errors = validateLoginForm('', '')
      expect(errors.email).not.toBe('')
      expect(errors.password).not.toBe('')
    })

    it('si todo es válido -> Devuelve string vacío', () => {
      const errors = validateLoginForm('user@example.com', 'contraseñavalida')
      expect(errors.email).toBe('')
      expect(errors.password).toBe('')
    })
  })

  // hasErrors
  describe('hasErrors', () => {
    it('Si hay errores -> Devuelve true', () => {
      expect(hasErrors({ email: 'Error', password: '' })).toBe(true)
      expect(hasErrors({ email: '', password: 'Error' })).toBe(true)
      expect(hasErrors({ email: 'Error', password: 'Error' })).toBe(true)
    })

    it('Si no hay errores -> Devuelve false', () => {
      expect(hasErrors({ email: '', password: '' })).toBe(false)
    })
  })
})