/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      screens: {
        '2xl': '1920px',
      },
      backgroundImage: {
        'custom-gradient-l': 'linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
        'custom-gradient-r': 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
      },
      filter: {
        'drop-shadow-custom': 'drop-shadow(rgba(0, 0, 0, 0.4) 0px 0px 25px)',
      },
      padding: {
        'aspect-4/3': 'calc(4 / 3 * 100%)', // Definindo a proporção 4:3
      }
    },
  },
  plugins: [],
}

