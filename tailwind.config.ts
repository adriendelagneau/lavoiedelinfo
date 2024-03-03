import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#172554',
        secondaryBlue: '#dbeafe',
        primaryRed: "#7f1d1d",
        primaryGray: "#6b7280"
      },
      fontFamily: {     
        FrankRuhlLibre: ['var(--font-FrankRuhlLibre)'],
     }
    },
  },
  plugins: [],
};
export default config;
