<template>
  <div class="flex items-center justify-end py-4 gap-4">
    <p class="text-sm text-gray-600">
      Página <span class="font-semibold">{{ currentPage }}</span>
      de <span class="font-semibold">{{ totalPages }}</span>
      · <span class="font-semibold">{{ totalCount }}</span> personajes
    </p>

    <!-- Botones de navegación -->
    <div class="flex items-center gap-2">
      <UiButton
        :disabled="!hasPrevPage"
        size="xs"
        color="base"
        variant="outlined"
        @click="$emit('prev')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Anterior
      </UiButton>

      <UiButton
        :disabled="!hasNextPage"
        size="xs"
        color="base"
        variant="outlined"
        @click="$emit('next')"
      >
        Siguiente
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  totalCount: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

defineProps<Props>()

defineEmits<{
  prev: []
  next: []
}>()
</script>