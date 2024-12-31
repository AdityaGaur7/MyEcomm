module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#818CF8',
          DEFAULT: '#4F46E5',
          dark: '#3730A3',
        },
        secondary: {
          light: '#F472B6',
          DEFAULT: '#EC4899',
          dark: '#DB2777',
        },
      },
    },
  },
  plugins: [],
}; 