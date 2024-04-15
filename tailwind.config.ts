import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        widescreen: { 'raw': "(min-aspect-ratio: 3/2)"},
        tailscreen: { 'raw': "(min-aspect-ratio: 13/20)"},
      },
      colors: {
        "primary-dark": "rgba(154, 39, 90, 1)",
        "primary-dark-90": "rgba(154, 39, 90, 0.9)",
        "primary-dark-85": "rgba(154, 39, 90, 0.85)",        
        "primary-dark-80": "rgba(154, 39, 90, 0.8)",
        "primary-dark-60": "rgba(154, 39, 90, 0.6)",
        "primary-light": "rgba(227, 101, 136, 1)",
        "secondary": "rgba(68, 127, 200, 1)",
        "color-1": "rgba(154, 196, 248, 1)",
        "color-2": "rgba(153, 237, 204, 1)",
        "color-3": "rgba(203, 162, 157, 1)",
        "fill-dark": "rgba(164, 164, 164, 1)",
        "fill-medium": "rgba(235, 235, 235, 1)",
        "fill-light": "rgba(239, 239, 239, 1)",
        "fill-body": "rgba(242, 242, 242, 1)",
        "fill-content": "rgba(248, 248, 248, 1)",                
      },
      spacing: {
        '76': '19rem',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config