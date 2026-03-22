import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight:    "#050c18",
        "navy-deep": "#07111f",
        navy:        "#0a1628",
        "navy-mid":  "#0d1f38",
        ocean:       "#112845",
        "ocean-light":"#163460",
        "blue-accent":"#1e5799",
        "blue-bright":"#2d7dd2",
        pearl:       "#dce9f7",
        "pearl-soft":"#eef4fc",
        "pearl-white":"#f5f9ff",
        gold:        "#c4a456",
        "gold-light":"#d8bb7a",
        "gold-dark": "#a0883e",
        silver:      "#8fa8c8",
        muted:       "#5a7a9a",
      },
      fontFamily: {
        cinzel:     ["Cinzel", "serif"],
        cormorant:  ["Cormorant Garamond", "serif"],
        inter:      ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "grad-ocean": "linear-gradient(160deg, #0d1f38 0%, #050c18 100%)",
        "grad-pearl": "linear-gradient(160deg, #f5f9ff 0%, #eef4fc 100%)",
        "grad-gold":  "linear-gradient(135deg, #c4a456 0%, #d8bb7a 100%)",
      },
      keyframes: {
        "pearl-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%":       { opacity: "1",   transform: "scale(1.05)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to:   { transform: "translateY(0)" },
        },
      },
      animation: {
        "pearl-pulse": "pearl-pulse 4s ease-in-out infinite",
        "fade-up":     "fade-up 0.6s ease forwards",
        "slide-up":    "slide-up 0.4s ease",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
