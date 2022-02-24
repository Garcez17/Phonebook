module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#ffffff',
      gray: {
        '50': 'hsl(0, 0%, 93%)',
        '100': 'hsl(0, 0%, 90%)',
        '500': '#666A70',
        '700': '#2A3035',
        '800': '#24292E',
        '900': '#202329',
      },
      blue: {
        '500': '#017BFF',
        '600': '#006CE0',
      },
      red: {
        '500': '#F02042',
        '600': '#EF1A3E',
      }
    },
  },
  plugins: [],
}