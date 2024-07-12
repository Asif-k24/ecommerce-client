export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7E33E0',
        'primary-light': '#EEEFFB',
        'primary-dark': '#151875',
        'secondary': '#FB2E86',
      },
      screens: {
        'sm': '576px',
        // => @media (min-width: 576px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '992px',
        // => @media (min-width: 992px) { ... }

        'xl': '1200px',
        // => @media (min-width: 1220px) { ... }

        '2xl': '1400px',
        // => @media (min-width: 1400px) { ... }
      },
      backgroundImage: {
        'banner-1': "url('./src/assets/images/banner-1.png')",
        'banner-2': "url('./src/assets/images/banner-2.png')",
        'banner-3': "url('./src/assets/images/banner-3.png')",
      },
    },
    plugins: [],
  }
}