/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"JetBrains Mono"', "monospace"],
        body: ['"Iosevka"', '"JetBrains Mono"', "monospace"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        brutal: {
          bg: "var(--brutal-bg)",
          "bg-secondary": "var(--brutal-bg-secondary)",
          "bg-tertiary": "var(--brutal-bg-tertiary)",
          text: "var(--brutal-text)",
          "text-secondary": "var(--brutal-text-secondary)",
          "text-muted": "var(--brutal-text-muted)",
          accent: "var(--brutal-accent)",
          "accent-hover": "var(--brutal-accent-hover)",
          border: "var(--brutal-border)",
          shadow: "var(--brutal-shadow)",
        },
      },
    },
  },
  plugins: [],
};
