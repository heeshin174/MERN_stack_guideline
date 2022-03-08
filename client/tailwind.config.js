module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4800",
        gold: "#ffd700",
      },
      spacing: {
        "60%": "60%", // p-80% - should work
        "80%": "80%", // p-80% - should work
        "20%": "20%", // p-80% - should work
      },
    },
  },
  plugins: [],
};
