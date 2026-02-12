/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors:{
        'primary-color': '#09B1CF',
        'primary-ligth-color': '#E0FDFF',
        'primary-dark-color': '#128da4',
        'secondary-color': '#B3DE19',
        'secondary-dark-color': '#b8c23d',
      }
    },
  },
  plugins: [],
}