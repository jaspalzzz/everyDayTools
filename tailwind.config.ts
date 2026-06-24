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
          DEFAULT: "#1a1a18",
          soft: "#5f5e5a",
          faint: "#888780",
        },
        brand: {
          50: "#E6F1FB",
          100: "#B5D4F4",
          600: "#185FA5",
          800: "#0C447C",
          900: "#042C53",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f5f4ef",
          line: "rgba(0,0,0,0.10)",
        },
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
