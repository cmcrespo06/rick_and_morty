<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-darker-color shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="flex justify-center mb-4">
                <img src="/logo.png" alt="Rick and Morty" class="h-10 object-contain" />
            </div>
            <span class="text-gray-400 text-sm hidden sm:block">
              {{ userEmail }}
            </span>
          </NuxtLink>

          <div class="flex items-center gap-1">
            <NuxtLink
              to="/"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="$route.path === '/'
                ? 'bg-primary-dark-color text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              Personajes
            </NuxtLink>

            <NuxtLink
              to="/favorites"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              :class="$route.path === '/favorites'
                ? 'bg-primary-dark-color text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'"
            >
              Favoritos
              <span
                v-if="favoritesCount > 0"
                class="bg-secondary-dark-color text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ favoritesCount }}
              </span>
            </NuxtLink>
          </div>

          <div class="flex items-center gap-3">
            <UiButton
              variant="text"
              color="base"
              size="sm"
              @click="handleLogout"
            >
              <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span class="text-gray-300 hidden sm:block text-sm">Cerrar sesión</span>
            </UiButton>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { handleLogout, userEmail } = useAuth()
const favoritesStore = useFavoritesStore()
const favoritesCount = computed(() => favoritesStore.favoritesCount)
</script>