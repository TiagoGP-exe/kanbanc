const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      dark: "#3B4555",
      primary: "#454A59",
      secondary: "#DCE3ED",
      background: "#EEF1F5",
    },
  },
  plugins: [],
};
