<template>
  <div :class="containerClasses">
    <!-- Spinner -->
    <div v-if="type === 'spinner'" :class="spinnerClasses" />

    <!-- Skeleton cards -->
    <div v-else-if="type === 'skeleton'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      <div
        v-for="n in skeletonCount"
        :key="n"
        class="bg-white rounded-xl overflow-hidden shadow animate-pulse"
      >
        <div class="bg-gray-200 h-48 w-full" />
        <div class="p-4 space-y-2">
          <div class="bg-gray-200 h-4 rounded w-3/4" />
          <div class="bg-gray-200 h-3 rounded w-1/2" />
        </div>
      </div>
    </div>

    <!-- Texto de carga -->
    <p v-if="text" class="text-gray-500 text-sm mt-3 animate-pulse">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
type LoaderType = 'spinner' | 'skeleton'
type LoaderSize = 'sm' | 'md' | 'lg'

interface Props {
  type?: LoaderType
  size?: LoaderSize
  text?: string
  skeletonCount?: number
  fullScreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'spinner',
  size: 'md',
  text: "Cargando...",
  skeletonCount: 12,
  fullScreen: false
})

const containerClasses = computed(() => [
  'flex flex-col items-center justify-center',
  props.fullScreen ? 'min-h-screen' : 'py-12'
])

const spinnerClasses = computed(() => {
  const sizes = {
    sm: 'w-10 h-10 border-2',
    md: 'w-16 h-16 border-4',
    lg: 'w-24 h-24 border-4'
  }

  return [
    'rounded-full border-gray-200 border-t-primary-color animate-spin',
    sizes[props.size]
  ].join(' ')
})
</script>