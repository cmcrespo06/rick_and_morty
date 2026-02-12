<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-1">
        Personajes universo Rick & Morty
      </h1>
    </div>

    <CharacterSearch
      v-model="searchQuery"
      :total-count="totalCount"
      @search="handleSearch"
      @clear="clearSearch"
    />

    <CharacterGrid
      :characters="characters"
      :is-loading="isLoading"
      :error="error"
      :is-empty="isEmpty"
      :search-query="searchQuery"
      @retry="fetchCharacters({ page: currentPage })"
      @clear-search="clearSearch"
    />

    <UiPagination
      v-if="!isLoading && hasResults"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-count="totalCount"
      :has-prev-page="hasPrevPage"
      :has-next-page="hasNextPage"
      @prev="goToPrevPage"
      @next="goToNextPage"
    />
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth',
  layout: 'mainlayout'
})

const {
  characters,
  isLoading,
  error,
  currentPage,
  totalPages,
  totalCount,
  searchQuery,
  hasNextPage,
  hasPrevPage,
  hasResults,
  isEmpty,
  fetchCharacters,
  handleSearch,
  goToNextPage,
  goToPrevPage,
  clearSearch
} = useCharacters()

// Cargar personajes
onMounted(async () => {
  await fetchCharacters({ page: 1 })
})
</script>