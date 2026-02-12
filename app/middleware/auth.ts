export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const token = localStorage.getItem('auth_token')

    // Si no hay token → redirigir al login
    if (!token) {
      return navigateTo('/login')
    }
  }

  if (import.meta.server) {
    return
  }
})