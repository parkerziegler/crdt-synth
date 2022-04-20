module.exports = {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        canvas: "#0b1418",
        neon: "#48D597",
        "neon-light": "#14312B",
        "neon-negative": "#D65D49",
        "neon-negative-light": "#301B14",
        "neon-caution": "#f5cf65",
        "neon-caution-light": "#2E3024",
        outline: "#30373b",
        "neon-white": "#464646",
      },
      fontFamily: {
        mono: '"SF Mono", SFMono-Regular, ui-monospace, "DejaVu Sans Mono", monospace',
      },
    },
  },
  plugins: [],
};
