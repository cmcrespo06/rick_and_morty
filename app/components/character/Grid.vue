<template>
  <div>
    <!-- Estado de carga con skeletons -->
    <UiLoader
      v-if="isLoading"
      type="skeleton"
      :skeleton-count="20"
    />

    <!-- Estado de error -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center py-16 text-center"
    >
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 mb-2">
        Algo salió mal
      </h3>
      <p class="text-gray-500 mb-4 max-w-sm">{{ error }}</p>
      <UiButton variant="fill" @click="$emit('retry')">
        Intentar de nuevo
      </UiButton>
    </div>

    <!-- Estado vacío (sin resultados) -->
    <CharacterEmpty
      v-else-if="isEmpty"
      :search-query="searchQuery"
      @clear="$emit('clearSearch')"
    />

    <!-- Grid de personajes -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <Transition
        v-for="character in characters"
        :key="character.id"
        name="card"
        appear
      >
        <CharacterCard :character="character" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/types-and-utils/character'

interface Props {
  characters: Character[]
  isLoading: boolean
  error: string | null
  isEmpty: boolean
  searchQuery: string
}

defineProps<Props>()

defineEmits<{
  retry: []
  clearSearch: []
}>()
</script>

<style scoped>
.card-enter-active {
  transition: all 0.3s ease;
}
.card-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>