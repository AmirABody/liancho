const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        1: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
        2: "0 4px 20px 0 rgba(59, 130, 246, 0.5)",
        3: "0 0 15px 0 rgba(34, 197, 94, 0.35)",
        4: "0 0 15px 0 rgba(60, 131, 246, 0.35)",
        5: "0 0 10px 0 rgba(34, 197, 94, 1)",
        6: "0 0 10px 0 rgba(59, 130, 246, 1)",
      },
      keyframes: {
        ripple: {
          "0%": {
            transform: "scale(1)",
            opacity: 0.8,
          },
          "50%": {
            transform: "scale(100)",
            opacity: 0.4,
          },
          "100%": {
            transform: "scale(200)",
            opacity: 0,
          },
        },
        progress: {
          "0%": {
            width: 0,
          },
          "100%": {
            width: "100%",
          },
        },
      },
      animation: {
        ripple: "ripple 1.5s ease forwards",
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    fontFamily: {
      dana: ["Dana"],
      danafanum: ["DanaFaNum"],
    },
  },
  plugins: [],
};
