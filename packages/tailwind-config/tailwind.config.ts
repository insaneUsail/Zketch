import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Semantic tokens (shadcn-style) — driven by CSS variables set in globals.css.
        // These were referenced by ui components (bg-primary, border-input, etc.)
        // but never actually defined, so those utilities were silently no-ops. Fixed now.
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // zketch brand palette — "ink violet" primary, "marker amber" accent
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#1e1240",
        },
        ink: {
          50: "#f7f7fb",
          100: "#eeeef5",
          200: "#d9d9e6",
          300: "#b3b3cc",
          400: "#7a7a99",
          500: "#4d4d70",
          600: "#33334d",
          700: "#232336",
          800: "#171724",
          900: "#0d0d16",
          950: "#08080d",
        },
      },
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #8b5cf6 0deg, #f97316 180deg, #ec4899 360deg)",
        "zketch-gradient": "linear-gradient(135deg, #8b5cf6 0%, #f97316 100%)",
      },
      keyframes: {
        "zketch-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(3deg)" },
        },
        "zketch-pulse-glow": {
          "0%, 100%": { opacity: "0.55", filter: "blur(18px)" },
          "50%": { opacity: "0.9", filter: "blur(24px)" },
        },
      },
      animation: {
        "zketch-float": "zketch-float 5s ease-in-out infinite",
        "zketch-glow": "zketch-pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
