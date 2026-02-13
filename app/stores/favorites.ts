import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character } from '~/types-and-utils/character'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Character[]>([])

  // Total de favoritos
  const favoritesCount = computed(() => favorites.value.length)

  // Comprobar si un personaje es favorito mediante su ID
  const isFavorite = computed(() => {
    return (characterId: number): boolean => {
      return favorites.value.some(char => char.id === characterId)
    }
  })

  // Cargar favoritos desde localStorage
  const loadFavorites = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('favorites')
      if (saved) {
        try {
          favorites.value = JSON.parse(saved)
        } catch {
          favorites.value = []
        }
      }
    }
  }

  // Guardar favoritos en localStorage
  const saveFavorites = () => {
    if (import.meta.client) {
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }
  }

  // Añadir a favoritos
  const addFavorite = (character: Character) => {
    if (!isFavorite.value(character.id)) {
      favorites.value.push(character)
      saveFavorites()
    }
  }

  // Eliminar de favoritos
  const removeFavorite = (characterId: number) => {
    favorites.value = favorites.value.filter(char => char.id !== characterId)
    saveFavorites()
  }

  // Añadir favorito si no está, eliminar si está
  const toggleFavorite = (character: Character) => {
    if (isFavorite.value(character.id)) {
      removeFavorite(character.id)
    } else {
      addFavorite(character)
    }
  }

  // Limpiar favoritos
  const clearFavorites = () => {
    favorites.value = []
    if (import.meta.client) {
      localStorage.removeItem('favorites')
    }
  }

  return {
    favorites,
    favoritesCount,
    isFavorite,
    loadFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites
  }
})