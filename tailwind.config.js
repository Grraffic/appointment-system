/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        regular: ["Regular"],
        LatoRegular: ["Lato-Regular"],
        LatoBold: ["Lato-Bold"],
      },

      colors: {
        Fwhite: "#FEFEFE",
        Bbackground: "#EEF2F7",
        LBackground: "#152F6A",
        OBackground: "#0D1858",
        Footer: "#F3F3F3",
        Gold: "#F3BC62",
      },
    },
  },
  plugins: [],
};
