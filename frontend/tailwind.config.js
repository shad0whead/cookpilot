module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F5DC',
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        gray: {
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      maxWidth: {
        '3/4': '75%',
      },
    },
  },
  plugins: [],
}
