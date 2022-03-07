const plugin = require('tailwindcss/plugin');
module.exports = {
  mode:"jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}",   
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily:{
      thrill:['Montserrat', 'sans-serif']
    } ,
    extend: {},
  },
  variants:{
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide"),
  plugin(({ addVariant, e }) => {
    addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
    });
  }),
],
}
