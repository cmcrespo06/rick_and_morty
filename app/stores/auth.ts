import { defineStore } from 'pinia'
import { validateLoginForm, hasErrors } from '~/types-and-utils/validators'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const userEmail = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  // Inicializar y guardar token en localStorage
  const initAuth = () => {
    if (import.meta.client) {
      const savedToken = localStorage.getItem('auth_token')
      const savedEmail = localStorage.getItem('auth_email')

      if (savedToken && savedEmail) {
        token.value = savedToken
        userEmail.value = savedEmail
      }
    }
  }

  // Login simulado (sin backend real)
  const login = async (email: string, password: string): Promise<boolean> => {
    error.value = null

    // Llamada función Validar formulario
    const errors = validateLoginForm(email, password)
    if (hasErrors(errors)) {
      error.value = errors.email || errors.password
      return false
    }

    isLoading.value = true

    try {
      // Espera para simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Generar token simulado
      const createToken = `token_${Date.now()}_${Math.random().toString(36).slice(2)}`

      // Guardar en estado
      token.value = createToken
      userEmail.value = email

      // Guardar en localStorage
      if (import.meta.client) {
        localStorage.setItem('auth_token', createToken)
        localStorage.setItem('auth_email', email)
      }

      return true
    } catch (err) {
      error.value = 'Error al iniciar sesión. Inténtalo de nuevo.'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Logout
  const logout = () => {
    token.value = null
    userEmail.value = null
    error.value = null

    if (import.meta.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_email')
    }
  }

  // Limpiar errores
  const clearError = () => {
    error.value = null
  }

  return {
    token,
    userEmail,
    isLoading,
    error,
    isAuthenticated,
    initAuth,
    login,
    logout,
    clearError
  }
})