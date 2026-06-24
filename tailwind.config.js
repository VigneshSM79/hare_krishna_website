/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FBFAF7',
        'paper-2': '#F4F1EA',
        ink: '#232020',
        stone: '#6B6660',
        line: '#E4DFD6',
        saffron: {
          DEFAULT: '#CD6A2B',
          ink: '#A8521D',
        },
        peacock: '#16564C',
      },
      fontFamily: {
        display: ['Spectral', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '10px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(35,32,32,.06)',
      },
      letterSpacing: {
        eyebrow: '0.16em',
        caption: '0.1em',
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};
