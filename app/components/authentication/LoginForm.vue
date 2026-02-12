<template>
  <div class="w-full max-w-md">
    <div class="text-center mb-4">
      <div class="flex justify-center mb-4">
        <img src="/logo.png" alt="Rick and Morty" class="h-20 object-contain" />
      </div>
      <h2 class="text-2xl font-bold text-gray-700 drop-shadow-lg">
        Gestión de personajes
      </h2>
    </div>

    <div class="bg-white rounded-2xl shadow-2xl p-7">
      <h2 class="text-l font-bold text-gray-800 mb-6">
        Iniciar sesión para continuar
      </h2>

      <!-- Error servidor -->
      <Transition name="fade">
        <div
          v-if="authError"
          class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm"
        >
          <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          {{ authError }}
        </div>
      </Transition>

      <!-- Formulario -->
      <form class="space-y-5" @submit.prevent="handleLogin">
        <UiInput
          v-model="email"
          label="Email"
          type="email"
          placeholder="usuario@email.com"
          :error="formErrors.email"
          required
          @blur="clearFieldError('email')"
        >
        </UiInput>

        <UiInput
          v-model="password"
          label="Contraseña"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Más de 6 caracteres"
          :error="formErrors.password"
          required
          @blur="clearFieldError('password')"
          @rightIconClick="showPassword = !showPassword"
        >
          <template #rightIcon>
            <svg
              v-if="showPassword"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
              />
            </svg>

            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </template>
        </UiInput>

        <div class="text-end">
          <UiButton
            type="submit"
            size="md"
            :full-width="false"
            :loading="isLoading"
            loading-text="Iniciando sesión..."
          >
            Iniciar sesión
          </UiButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  email,
  password,
  formErrors,
  isLoading,
  authError,
  handleLogin,
  clearFieldError,
} = useAuth();

const showPassword = ref(false);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
