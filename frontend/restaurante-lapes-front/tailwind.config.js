/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primario: '#B91C1C',     // vermelho forte
        secundario: '#FDE68A',   // amarelo claro
        fundo: '#FFFDF6',        // cor de fundo clara personalizada (opcional)
        texto: '#1F2937',        // cinza escuro para texto padrão
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      boxShadow: {
        primario: '0 4px 6px -1px rgba(185, 28, 28, 0.1)',
      },
    },
  },
  darkMode: 'class', // você pode alternar dark mode com a classe "dark"
  plugins: [],
}