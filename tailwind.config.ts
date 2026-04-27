import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        paper: {
          50: '#fdf9f3',
          100: '#fbf3e8',
          200: '#f7e6d4',
        },
        ink: {
          900: '#0b0b09',
          700: '#2a2a25',
        },
        accent: {
          DEFAULT: '#8b2d2d',
          light: '#b85a5a',
        },
        warm: {
          DEFAULT: '#c89f57',
        },
      },
      boxShadow: {
        paper: '0 6px 18px rgba(15,12,8,0.08)',
      },
      maxWidth: {
        card: '56rem',
      },
    },
  },
  plugins: [],
};

export default config;
