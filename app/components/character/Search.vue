<template>
  <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">

    <!-- Buscador -->
    <div class="relative w-full">
      <UiInput
        v-model="localQuery"
        placeholder="Buscar personaje..."
        type="text"
        @update:model-value="onSearch"
      >
        <template #leftIcon>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </template>

        <!-- Botón limpiar búsqueda -->
        <template v-if="localQuery" #rightIcon @click="$emit('clear')">
          <svg class="w-5 h-5 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </template>
      </UiInput>
    </div>

    <!-- Info de resultados -->
    <div class="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      <span>
        <span class="font-semibold text-gray-700">{{ totalCount }}</span>
        personajes encontrados
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  totalCount: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [value: string]
  'clear': []
}>()

const localQuery = ref(props.modelValue)

const onSearch = (value: string) => {
  localQuery.value = value
  emit('update:modelValue', value)
  emit('search', value)

  if (!value) {
    emit('clear')
  }
}

// Sincronizar si el padre cambia el valor
watch(() => props.modelValue, (val) => {
  localQuery.value = val
})
</script>