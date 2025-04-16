/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#124469", // azul oscuro
        accent: "#DD5955",  // rojo
      },
    },
  },
  plugins: [],
}
