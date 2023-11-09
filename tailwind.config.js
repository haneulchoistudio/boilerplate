/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}", "./modules/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        cutoff: "1280px",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
