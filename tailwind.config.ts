import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#102033",
          soft: "#52616F",
          faint: "#607080",
        },
        brand: {
          50:  "#EAF0F8",
          100: "#CFDEEF",
          200: "#A6C2E0",
          300: "#6E97C6",
          600: "#1E4E8C",
          700: "#163C6B",
          800: "#12294A",
          900: "#0C1B33",
        },
        surface: {
          DEFAULT: "#ffffff",
          paper: "#FAF8F2",
          muted: "#F4F1E9",
          line: "#E4DECF",
          control: "var(--color-control-border)",
        },
        success: {
          DEFAULT: "#16835B",
          50: "#E8F7F2",
        },
        warning: {
          DEFAULT: "#B7791F",
          50: "#FEF3E2",
        },
        navy: "#16324F",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
      },
      maxWidth: {
        content: "960px",
      },
    },
  },
  plugins: [],
};

export default config;
