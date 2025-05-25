/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    fontFamily: {
      Poppins: ["poppins"]
    },
     screens: {
        sm: { max: "450px" },
        md: { max: "768px" },
        lg: { max: "1024px" },
        xl: { max: "1280px" },
      },
    colors: {
      primary: "#8b5cf6",
      "primary-600": "#7c3aed", 
      neutral: "#F3F4F6",
    }
   }
  },
  plugins: [],
}

