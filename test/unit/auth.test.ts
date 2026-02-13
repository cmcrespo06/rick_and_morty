import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '~/stores/auth'

// Mock de localStorage
const localStorageMock = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => localStorageMock.store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { localStorageMock.store[key] = value }),
  removeItem: vi.fn((key: string) => { delete localStorageMock.store[key] }),
  clear: vi.fn(() => { localStorageMock.store = {} })
}

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

describe('useAuthStore', () => {
  beforeEach(() => {
    // Crear una pinia nueva antes de cada test
    setActivePinia(createPinia())
    localStorageMock.clear()
  })

  // Estado inicial
  describe('estado inicial', () => {
    it('Token null al inicio', () => {
      const store = useAuthStore()
      expect(store.token).toBeNull()
    })

    it('No esta autenticado al inicio', () => {
      const store = useAuthStore()
      expect(store.isAuthenticated).toBe(false)
    })

    it('No esta cargando al inicio', () => {
      const store = useAuthStore()
      expect(store.isLoading).toBe(false)
    })
  })

  // Login
  describe('login', () => {
    it('Autenticar con credenciales válidas', async () => {
      const store = useAuthStore()
      const result = await store.login('test@example.com', 'contraseñavalida')

      expect(result).toBe(true)
      expect(store.isAuthenticated).toBe(true)
      expect(store.token).not.toBeNull()
      expect(store.userEmail).toBe('test@example.com')
    })

    it('Falla con email inválido', async () => {
      const store = useAuthStore()
      const result = await store.login('noemail', 'contraseñavalida')

      expect(result).toBe(false)
      expect(store.isAuthenticated).toBe(false)
      expect(store.error).not.toBeNull()
    })

    it('Falla con contraseña corta', async () => {
      const store = useAuthStore()
      const result = await store.login('test@example.com', '123')

      expect(result).toBe(false)
      expect(store.isAuthenticated).toBe(false)
    })
  })

  // Logout
  describe('logout', () => {
    it('Limpiar el estado al hacer logout', async () => {
      const store = useAuthStore()
      await store.login('test@example.com', 'contraseñavalida')
      store.logout()

      expect(store.token).toBeNull()
      expect(store.userEmail).toBeNull()
      expect(store.isAuthenticated).toBe(false)
    })
  })

  // clearError
  describe('clearError', () => {
    it('Limpiar el error', async () => {
      const store = useAuthStore()
      await store.login('invalido', '123')

      expect(store.error).not.toBeNull()
      store.clearError()
      expect(store.error).toBeNull()
    })
  })
})