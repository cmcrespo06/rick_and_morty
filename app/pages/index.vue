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

    <UiLoader >

    </UiLoader>

    <UiBadge status="Alive">

    </UiBadge>

    <UiBadge status="Dead">

    </UiBadge>

    <UiBadge status="unknown">

    </UiBadge>

  </div>
</template>

<script setup lang="ts">
// Proteger ruta con middleware
definePageMeta({
  middleware: 'auth',
  layout: 'mainlayout'
})

</script>