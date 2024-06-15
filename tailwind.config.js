/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        "main-purple": "#c8b6ff",
        "sharp-purple": "#7161ef",
        "main-pink": "#ff5d8f",
        "light-pink": "#feeafa",
        "mid-pink": "#ffc8dd",
        "light-grey": "#f4f4f6",
        "sharp-pink": "#f72585",
        "main-red": "#dd0426",
        "dark-green": "#336b79",
        "light-green": "#25c7c0",
        "mid-green": "#31859b",
        "alert-green": "#01B700",
      },
      fontFamily: {
        muktaFont: ["Mukta", "sans-serif"],
        robotoFont: ["Roboto", "sans-serif"],
        rubikFont: ["Rubik", "Poppins", "Roboto"],
        poppinsFont: ["Poppins", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
