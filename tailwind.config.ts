import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        oswald: ['var(--font-oswald)'],
      },
      colors: {
        primary: {
          DEFAULT: '#db924b',
          dark: '#af753c',
          text: '#56310d ',
        },
        secondary: {
          DEFAULT: '#263e3f',
          dark: '#1e3232',
          text: '#bbeff2',
        },
        accent: {
          DEFAULT: '#10576d',
          dark: '#0d4657',
          text: '#b2edff',
        },
        info: {
          DEFAULT: '#8dcac1',
          text: '#00453a',
        },
        success: {
          DEFAULT: '#9db787',
          text: '#1d4000',
        },
        warning: {
          DEFAULT: '#ffd25f',
          text: '#463200',
        },
        error: {
          DEFAULT: '#fc9581',
          text: '#4c0c00',
        },
        gray: {
          DEFAULT: '#d3d3d3',
          dark: '#9d9d9d',
        },
        link: '#c48244',
      },
      backgroundColor: {
        //TODO: I'm not sure yet?
        primary: '#1e1e1e',
        // primary: '#20161f',
      },
    },
  },
  plugins: [],
} satisfies Config;
