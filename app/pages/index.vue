<template>
  <div>
    <!-- Header de la página -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-1">
        Personajes universo Rick & Morty
      </h1>
    </div>

  
     <UiPagination
      v-if="true"
      :current-page="2"
      :total-pages="4"
      :total-count="4"
      :has-prev-page="true"
      :has-next-page="true"
      @prev=""
      @next=""
    />


    <CharacterSearch v-model="searchQuery" 
    :total-count="characters.length"
    @search="handleSearch"
    @clear="handleClear" />

  <CharacterGrid 
  :characters="characters" 
  :is-loading="false"
  error=""
  :is-empty="characters.length === 0"
  search-query=""
/>

  </div>
</template>

<script setup lang="ts">
// Proteger ruta con middleware
definePageMeta({
  middleware: 'auth',
  layout: 'mainlayout'
})

import type { Character } from '~/types-and-utils/character'


const characters = ref<Character[]>([
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    url: '',
    created: ''
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    url: '',
    created: ''
  },
  {
    id: 3,
    name: 'Summer Smith',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    url: '',
    created: ''
  }
])
const characters2 = ref<Character[]>([
])

const searchQuery = ref('')

const handleSearch = (value: string) => {
  console.log('Buscando:', value)
  // Aquí iría tu lógica de filtrado o llamada a la API
}

const handleClear = () => {
  searchQuery.value = ''
  // Lógica para resetear la lista
}


</script>