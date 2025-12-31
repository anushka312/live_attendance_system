/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inconsolata: ['Inconsolata', 'monospace'],
        hegarty: ['BBHHegarty', 'sans-serif'],
        lexendexa: ['LexendExa', 'monospace']
      },
    },
  },

  plugins: [],
};
