<template>
  <span :class="badgeClasses">
    <span class="w-2 h-2 rounded-full mr-1.5" :class="dotClasses" />
    {{ label || status }}
  </span>
</template>

<script setup lang="ts">
import type { CharacterStatus } from '~/types-and-utils/character'

interface Props {
  status: CharacterStatus
  label?: string
}

const props = defineProps<Props>()

const badgeClasses = computed(() => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'

  const variants: Record<CharacterStatus, string> = {
    Alive: 'bg-green-100 text-green-800',
    Dead: 'bg-red-100 text-red-800',
    unknown: 'bg-gray-100 text-gray-800'
  }

  return [base, variants[props.status]].join(' ')
})

const dotClasses = computed(() => {
  const variants: Record<CharacterStatus, string> = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500'
  }

  return variants[props.status]
})
</script>