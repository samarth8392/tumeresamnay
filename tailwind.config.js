/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["*"],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
      '20': '20px',
    },
    extend: {
      fontFamily: {
        'heading': ['Montserrat', 'sans-serif'],
        'sans': ['Roboto', 'sans-serif']
      },
      colors: {
        primary: '#E9663C',
        bodyColor: '#555555',
        headingColor: '#333333',
      },         
      backgroundImage: {
        'banner': "url('images/banner1-img.jpg')",
        'video': "url('images/video-bg.jpg')",
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        html: { color: theme("colors.bodyColor") },
      });
    }),
    require('@tailwindcss/forms'),
  ],
}
