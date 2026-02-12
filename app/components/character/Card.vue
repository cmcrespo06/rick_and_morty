<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">

    <!-- Imagen del personaje -->
    <div class="relative overflow-hidden">
      <img
        :src="character.image"
        :alt="character.name"
        class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Botón favorito -->
      <button
        class="absolute top-2 right-2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
        :class="isFav
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-white/80 hover:bg-white'"
        @click.prevent="toggleFav"
      >
        <svg
          class="w-5 h-5 transition-transform duration-200 hover:scale-110"
          :class="isFav ? 'text-white' : 'text-gray-400'"
          :fill="isFav ? 'currentColor' : 'none'"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <!-- Badge de estado -->
      <div class="absolute bottom-2 left-2">
        <UiBadge :status="character.status" />
      </div>
    </div>

    <!-- Información del personaje -->
    <div class="p-4">
      <!-- Nombre -->
      <h3 class="font-bold text-gray-900 text-lg leading-tight truncate mb-2">
        {{ character.name }}
      </h3>

      <!-- Detalles -->
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
          <span class="truncate">{{ character.species }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from '~/types-and-utils/character'

interface Props {
  character: Character
}

const props = defineProps<Props>()

let isFav = true

const toggleFav = () => {
  isFav = !isFav
}
</script>