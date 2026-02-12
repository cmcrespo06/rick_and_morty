<template>
  <div>
    <UiButton> Botón prueba </UiButton>
    <UiButton variant="outlined"> Botón prueba </UiButton>
    <UiButton variant="text"> Botón prueba </UiButton>
    <UiButton color="secondary"> Botón prueba </UiButton>
    <UiButton variant="outlined" color="secondary"> Botón prueba </UiButton>
    <UiButton variant="text" color="secondary"> Botón prueba </UiButton>
    <UiButton color="danger" :full-width="false"> Botón prueba </UiButton>
    <UiButton variant="outlined" color="danger"> Botón prueba </UiButton>
    <UiButton variant="text" color="danger"> Botón prueba </UiButton>

    <UiInput
      modelValue=""
      label="Contraseña"
      placeholder="Más de 6 caracteres"
      required
    >
      <template #leftIcon>
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </template>

      <template #rightIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </template>
    </UiInput>
  </div>
</template>
