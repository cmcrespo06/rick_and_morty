<template>
  <button :class="buttonClasses" :disabled="disabled" @click="$emit('click')">
    <span class="flex items-center gap-2">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = "fill" | "outlined" | "text";
type ButtonColor = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md" | "lg";

//Definir los colores base según el estilo seleccionado
const colorMap = {
  primary: {
    bg: "bg-primary-color",
    hoverBg: "hover:bg-primary-dark-color", // Un tono un poco más oscuro para el hover
    text: "text-primary-color",
    border: "border-primary-color",
    ring: "focus:ring-primary-color",
  },
  secondary: {
    bg: "bg-secondary-color",
    hoverBg: "hover:bg-secondary-dark-color",
    text: "text-secondary-color",
    border: "border-secondary-color",
    ring: "focus:ring-secondary-color",
  },
  danger: {
    bg: "bg-red-500",
    hoverBg: "hover:bg-red-600",
    text: "text-red-500",
    border: "border-red-500",
    ring: "focus:ring-red-500",
  },
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

interface Props {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "fill",
  color: "primary",
  size: "md",
  disabled: false,
  fullWidth: true,
});

defineEmits<{
  click: [];
}>();

const buttonClasses = computed(() => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed m-2";
  const colors = colorMap[props.color];

  // Aplicamos las clases de color según la variante seleccionada
  const variantClasses = {
    fill: `${colors.bg} ${colors.hoverBg} text-white focus:ring-transparent`,
    outlined: `bg-transparent ${colors.border} border-2 ${colors.text} hover:bg-gray-50 focus:ring-transparent`,
    text: `bg-transparent ${colors.text} hover:bg-gray-100 border-none ${colors.ring}`,
  };

  return [
    base,
    variantClasses[props.variant],
    sizes[props.size],
    props.fullWidth ? "w-full" : "",
  ].join(" ");
});
</script>
