<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const favoritesStore = useFavoritesStore()

// Inicializar stores al cargar la app
onMounted(() => {
  authStore.initAuth()
  favoritesStore.loadFavorites()
})
</script>