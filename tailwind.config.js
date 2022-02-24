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
  plugins: [require("tailwind-scrollbar-hide")],
}
