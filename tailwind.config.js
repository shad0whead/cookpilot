/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F7942', // Sage green
          light: '#6A9955',
          dark: '#3A5A32',
        },
        secondary: {
          DEFAULT: '#F08080', // Light coral
          light: '#F5A3A3',
          dark: '#E05D5D',
        },
        accent: {
          DEFAULT: '#FFD700', // Gold
          light: '#FFDF33',
          dark: '#CCAC00',
        },
        background: {
          DEFAULT: '#F5F5F5', // Off-white for light mode
          dark: '#E0E0E0',
          // Dark mode colors
          darkmode: '#1F2937', // Dark slate gray
          darkmode2: '#111827', // Even darker slate
        },
        textColor: {
          DEFAULT: '#333333', // Dark gray for light mode
          light: '#666666',
          // Dark mode colors
          darkmode: '#E5E7EB', // Light gray for dark mode
          darkmode2: '#9CA3AF', // Medium gray for dark mode
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        // Dark mode shadows
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark': '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
  // Enable responsive variants for all utilities
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active', 'dark'],
      textColor: ['responsive', 'hover', 'focus', 'active', 'dark'],
      borderColor: ['responsive', 'hover', 'focus', 'active', 'dark'],
      borderWidth: ['responsive', 'hover', 'focus', 'dark'],
      padding: ['responsive'],
      margin: ['responsive'],
      width: ['responsive'],
      height: ['responsive'],
      display: ['responsive'],
      flexDirection: ['responsive'],
      alignItems: ['responsive'],
      justifyContent: ['responsive'],
      gap: ['responsive'],
      gridTemplateColumns: ['responsive'],
      fontSize: ['responsive'],
      fontWeight: ['responsive', 'hover', 'focus'],
      opacity: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      scale: ['responsive', 'hover', 'focus', 'active'],
      translate: ['responsive', 'hover', 'focus', 'active'],
    },
  },
}
