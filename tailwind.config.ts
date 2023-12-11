import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border1: colors.neutral[800],
        border2: colors.neutral[400],
        text1: colors.neutral[900],
        text2: colors.amber[100],
      },
      boxShadow: {
        shadow1: `0 0 0 1px ${colors.neutral[200]}`,
      },
      border: {
        border1: `1px solid ${colors.neutral[800]}`,
        border2: `2px solid ${colors.neutral[500]}`,
      },
      backgroundColor: {
        background1: "rgba(255, 255, 255, 0.9)",
        hov: colors.amber[100],
      },
    },
  },
  plugins: [],
};
export default config;
