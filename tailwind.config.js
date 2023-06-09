/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    
    extend: {
      
      fontFamily: {
        roboto: "Roboto",
    },
    colors: {
       primary: "#F97316",
       // primary: "#020101",
       // primary: "#020201",
        secondary: "#2AC299",
    },
    boxShadow: {
        primary: "0 3px 13px 2px rgba(255, 0, 0, 0.8)",
    },
     
      animation: {
        slideup: 'slideup 1s ease-in-out',
        slideup42: 'slideup42 1s ease-in-out',
        slideup422: 'slideup42 0.6s ease-in-out',
        slideup423: 'slideup42 2s ease-in-out',
        
        slidedown: 'slidedown 1s ease-in-out',
        slidedown2: 'slidedown2 1s ease-in-out',
        slideleft: 'slideleft 1s ease-in-out',
        slideleft3: 'slideleft3 2s ease-in-out',
        slideleft2: 'slideleft2 1.1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        slideright2: 'slideright2 1.1s ease-in-out',
        widthChange: 'widthChange 1s ease-in-out',
        wave: 'wave 1.2s linear infinite',
        slowfade: 'slowfade 2.2s ease-in-out',
        slowfade2: 'slowfade2 1.5s ease-in-out',
      },
      keyframes: {
        slowfade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slowfade2: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideup42: {
          from: { opacity: 0, transform: 'translateY(100%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
        slidedown2: {
          from: { opacity: 0, transform: 'translateY(-100px)' },
          to: { opacity: 1, transform: 'none' },
        },
        slideleft: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideleft3: {
          from: { opacity: 0, transform: 'translateX(-200px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideleft2: {
          from: { opacity: 0, transform: 'translateX(-160px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideright2: {
          from: { opacity: 0, transform: 'translateX(160px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        widthChange: {
          from: { opacity: 0, transform: 'w-[63%]' },
          to: { opacity: 1, transform: 'w-[100%]' },
        },
        wave: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
    },
    
      
      
    
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'xs': '475px',
      '1xs': '350px',
      
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      '1lg': '1110px',
      '3lg': '800px',
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1690px',

      '4se': '933px',

      '2lg': '550px'
    }
  
  },
  plugins: [],
}

