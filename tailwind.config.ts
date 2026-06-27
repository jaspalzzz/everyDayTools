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
          faint: "#8A9BA8",
        },
        brand: {
          50:  "#EAF3FF",
          100: "#C8E0FB",
          200: "#A8C8F0",
          300: "#7AB5F5",
          600: "#1769E0",
          700: "#1458BA",
          800: "#16324F",
          900: "#0D1F30",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#F6F9FC",
          line: "#D8E2EC",
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
