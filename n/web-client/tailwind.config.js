module.exports = {
  content: ["./src/**/*.{html,js, jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#85d7ff",
          DEFAULT: "#eaeadc",
          dark: "#009eeb",
        },
        secondary: {
          light: "#9ae6b4",
          DEFAULT: "#d8c3a5",
          dark: "#38a169",
        },
        webBlue: {
          light: "#85d7ff",
          DEFAULT: "#8e8d8a",
          dark: "#009eeb",
        },
        webRed: {
          light: "#ff6161",
          DEFAULT: "#e98074",
          dark: "#ff0000",
        },
        webDarkRed: {
          DEFAULT: "#e85a4f",
        },
      },
    },
  },
  plugins: [],
};
