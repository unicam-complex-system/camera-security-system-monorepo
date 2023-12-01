import type { Config } from "tailwindcss";
import { theme } from "./theme";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: theme.colors.white,
        black: theme.colors.black,
        primary: theme.colors.primaryColor,
        secondary: theme.colors.secondaryColor,
      },
    },
  },
  plugins: [],
};
export default config;
