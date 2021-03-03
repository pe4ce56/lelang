const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#2695FF",
      secondary: "#484848",
      danger: "#FF3B21",
      color2: "#999999",
      color3: "#707070",
      color4: "#484848",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.yellow,
      blue: colors.blue,
    },
    fontFamily: {
      mont: "Montserrat",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
