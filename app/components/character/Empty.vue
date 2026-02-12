<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <div
      class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-16 h-16 text-gray-600"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>


    <h3 class="text-xl font-bold text-gray-800 mb-2">
      No se encontraron personajes
    </h3>
    <p class="text-gray-500 mb-6 max-w-sm">
      No hay resultados para
      <span v-if="searchQuery" class="font-semibold text-gray-700">
        "{{ searchQuery }}"
      </span>
      <span v-else>tu búsqueda</span>.
      <span v-if="searchQuery">Intenta con otro nombre</span>.
    </p>

    <UiButton v-if="searchQuery" variant="outlined" color="base" :full-width="false" @click="$emit('clear')">
      Limpiar búsqueda
    </UiButton>
  </div>
</template>

<script setup lang="ts">
interface Props {
  searchQuery?: string;
}

defineProps<Props>();

defineEmits<{
  clear: [];
}>();
</script>
