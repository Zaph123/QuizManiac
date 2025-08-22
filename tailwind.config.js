/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Add this line for manual dark mode toggling
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["poppins"]
      },
      colors: {
        primary: "#8b5cf6",
        "primary-600": "#7c3aed", 
        neutral: "#F3F4F6",
        // Add dark mode colors
        dark: {
          background: "#1a1a1a",
          text: "#f3f4f6",
          primary: "#7c3aed",
          neutral: "#1f2937",
        }
      },
      boxShadow: {
        lg: "0px -1px 30px 4px rgba(0, 0, 0, 0.05);",
        "2xl": "0 5px 10px rgb(210, 35, 170, .24.?)",
        "3xl": "0 20px 27px 0 rgba(0,0,0,0.05)"
      }
    }
  },
  plugins: [],
}