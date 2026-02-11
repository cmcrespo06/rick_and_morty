// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],


  css: ['~/assets/css/styles.css'],

  app: {
    head: {
      title: 'Personajes Rick & Morty',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Dashboard de personajes de Rick and Morty' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' }
      ]
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  }
})
