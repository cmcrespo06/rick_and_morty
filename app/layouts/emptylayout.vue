<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-100 via-primary-ligth-color to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
    <div class="absolute z-10 w-full flex justify-center">
      <slot />
    </div>

    <p class="absolute bottom-4 text-gray-500 text-xs">
      Rick and Morty · Personajes
    </p>
  </div>
</template>

<script/>