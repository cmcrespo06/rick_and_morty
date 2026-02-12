<template>
  <div class="flex flex-col gap-1">
    <!-- Etiqueta input -->
    <label
      v-if="label"
      :for="inputId"
      class="text-sm font-medium text-gray-800"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Input -->
    <div class="relative">
      <!-- Icono izquierda -->
      <div
        v-if="$slots.leftIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"
      >
        <slot name="leftIcon" />
      </div>

      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClasses"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @blur="$emit('blur')"
      />

      <!-- Icono derecha -->
      <div
        v-if="$slots.rightIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
        @click="$emit('rightIconClick')"
      >
        <slot name="rightIcon" />
      </div>
    </div>

    <!-- Mensaje de error -->
    <Transition name="fade">
      <p v-if="error" class="text-sm text-red-500 flex items-center gap-1 ml-2">
        {{ error }}
      </p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  required: false,
});

defineEmits<{
  "update:modelValue": [value: string];
  blur: [];
  rightIconClick: [];
}>();

// ID único para conectar label con input
const inputId = `input-${Math.random().toString(36).slice(2)}`;

const slots = useSlots();

const inputClasses = computed(() => {
  const base =
    "px-9 w-full rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 disabled:bg-gray-50 disabled:cursor-not-allowed";
  const withLeftIcon = "pl-10";
  const withRightIcon = "pr-10";
  const hasError = "border-red-400 focus:border-red-400 focus:ring-red-300";
  const noError = "border-gray-300 focus:border-green-400 focus:ring-green-300";

  return [
    base,
    slots.leftIcon ? withLeftIcon : "",
    slots.rightIcon ? withRightIcon : "",
    props.error ? hasError : noError,
  ].join(" ");
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
