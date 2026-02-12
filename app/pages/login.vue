<template>
  <div class="flex items-center justify-center min-h-screen">
    <Transition name="slide-up" appear>
      <AuthenticationLoginForm />
    </Transition>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

// Si ya está autenticado, redirigir al home
if (authStore.isAuthenticated) {
  await navigateTo('/')
}

// Definir layout
definePageMeta({
  layout: 'emptylayout'
})
</script>

<style scoped>
.slide-up-enter-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>