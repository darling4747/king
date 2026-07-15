/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // JALA Connect Color Palette
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#6366f1', // Primary Indigo
          600: '#4f46e5', // Darker Indigo
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        jala: {
          bg: '#15172b',      // Dark portal background
          card: '#1e2035',    // Card background
          input: '#303245',   // Input field background
          accent: '#c0ff3e',  // Lime-yellow accent glow
          border: '#c3c5d9',  // Border color
        },
        darkbg: '#0b0f19',    // Deep body background
        cardbg: '#111827',    // Card background in dark mode
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

