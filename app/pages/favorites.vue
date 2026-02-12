<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-1">
          Mis favoritos
        </h1>
        <p class="text-gray-500">
          Tienes
          <span class="font-semibold text-gray-700">
            {{ favoritesCount }}
          </span>
          personaje{{ favoritesCount !== 1 ? 's' : '' }} guardado{{ favoritesCount !== 1 ? 's' : '' }}
        </p>
      </div>

      <!-- Botón limpiar todos -->
      <UiButton
        v-if="favoritesCount > 0"
        variant="outlined"
        color="danger"
        size="sm"
        :full-width="false"
        @click="confirmClear"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
        Limpiar todos
      </UiButton>
    </div>

    <!-- Modal de confirmación -->
    <Transition name="fade">
      <div
        v-if="showConfirm"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="showConfirm = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-bold text-gray-900">¿Eliminar todos?</h3>
              <p class="text-sm text-gray-500">Esta acción no se puede deshacer</p>
            </div>
          </div>

          <div class="flex gap-3">
            <UiButton
              variant="fill"
              color="base"
              full-width
              @click="showConfirm = false"
            >
              Cancelar
            </UiButton>
            <UiButton
              variant="outlined"
              color="danger"
              full-width
              @click="handleClearAll"
            >
              Eliminar todo
            </UiButton>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Estado vacío -->
    <div
      v-if="favoritesCount === 0"
      class="flex flex-col items-center justify-center py-20 text-center" >
      <h3 class="text-xl font-bold text-gray-800 mb-2">
        No tienes favoritos aún
      </h3>
      <p class="text-gray-500 mb-6 max-w-sm">
        Ve a la ventana principal y pulsa el corazón en los personajes que más te gusten
      </p>
      <UiButton variant="outlined" color="base" :full-width="false" @click="$router.push('/')">
        Explorar personajes
      </UiButton>
    </div>

    <!-- Grid de favoritos -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <Transition
        v-for="character in favorites"
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
// Proteger ruta con middleware
definePageMeta({
  middleware: 'auth',
  layout: 'mainlayout'
})

const favoritesStore = useFavoritesStore()

const favorites = computed(() => favoritesStore.favorites)
const favoritesCount = computed(() => favoritesStore.favoritesCount)

// Modal de confirmación
const showConfirm = ref(false)

const confirmClear = () => {
  showConfirm.value = true
}

const handleClearAll = () => {
  favoritesStore.clearFavorites()
  showConfirm.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.card-enter-active {
  transition: all 0.3s ease;
}
.card-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>