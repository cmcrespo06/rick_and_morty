import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritesStore } from '~/stores/favorites'
import type { Character } from '~/types-and-utils/character'

// Mock personaje de prueba
const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  url: '',
  created: ''
}

const mockCharacter2: Character = {
  ...mockCharacter,
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  url: '',
  created: ''
}

// Mock localStorage
const localStorageMock = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => localStorageMock.store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => { localStorageMock.store[key] = value }),
  removeItem: vi.fn((key: string) => { delete localStorageMock.store[key] }),
  clear: vi.fn(() => { localStorageMock.store = {} })
}

Object.defineProperty(global, 'localStorage', { value: localStorageMock })

describe('useFavoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorageMock.clear()
  })

  // Estado inicial
  describe('estado inicial', () => {
    it('Lista de favoritos vacía -> Devuelve 0', () => {
      const store = useFavoritesStore()
      expect(store.favorites).toHaveLength(0)
    })

    it('Contador favoritos vacío -> Devuelve 0', () => {
      const store = useFavoritesStore()
      expect(store.favoritesCount).toBe(0)
    })
  })

  // addFavorite
  describe('addFavorite', () => {
    it('Añadir un personaje a favoritos -> Número favoritos > 0', () => {
      const store = useFavoritesStore()
      store.addFavorite(mockCharacter)

      expect(store.favorites).toHaveLength(1)
      expect(store.favorites[0].id).toBe(1)
    })

    it('No añadir el mismo personaje dos veces -> Número favoritos no varía', () => {
      const store = useFavoritesStore()
      store.addFavorite(mockCharacter)
      store.addFavorite(mockCharacter)

      expect(store.favorites).toHaveLength(1)
    })
  })

  // removeFavorite
  describe('removeFavorite', () => {
    it('Eliminar un personaje de favoritos', () => {
      const store = useFavoritesStore()
      store.addFavorite(mockCharacter)
      store.removeFavorite(mockCharacter.id)

      expect(store.favorites).toHaveLength(0)
    })

    it('Eliminar uno no afecta al resto de favoritos', () => {
      const store = useFavoritesStore()
      store.addFavorite(mockCharacter)
      store.addFavorite(mockCharacter2)
      store.removeFavorite(mockCharacter.id)

      expect(store.favorites).toHaveLength(1)
      expect(store.favorites[0].id).toBe(2)
    })
  })

  // toggleFavorite
  describe('toggleFavorite', () => {
    it('Añadir a favoritos si no lo es -> Devuelve true', () => {
      const store = useFavoritesStore()
      store.toggleFavorite(mockCharacter)

      expect(store.isFavorite(mockCharacter.id)).toBe(true)
    })

    it('Eliminar si ya es favorito -> Devuelve false', () => {
      const store = useFavoritesStore()
      store.addFavorite(mockCharacter)
      store.toggleFavorite(mockCharacter)

      expect(store.isFavorite(mockCharacter.id)).toBe(false)
    })
  })

  // isFavorite
  describe('isFavorite', () => {
    it('Si el personaje es favorito -> Duvuelve true', () => {
      const store = useFavoritesStore()
      store.addFavorite(mockCharacter)

      expect(store.isFavorite(mockCharacter.id)).toBe(true)
    })

    it('Si el personaje no es favorito -> Devuelve false', () => {
      const store = useFavoritesStore()

      expect(store.isFavorite(999)).toBe(false)
    })
  })

  // clearFavorites
  describe('clearFavorites', () => {
    it('Limpiar todos los favoritos -> Devuelve 0', () => {
      const store = useFavoritesStore()
      store.addFavorite(mockCharacter)
      store.addFavorite(mockCharacter2)
      store.clearFavorites()

      expect(store.favorites).toHaveLength(0)
      expect(store.favoritesCount).toBe(0)
    })
  })
})