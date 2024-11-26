import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	  extend: {
		  fontFamily: {
			  dmsans: ['var(--font-dm-sans)', 'sans-serif'],
			  catamaran: ['var(--font-catamaran)', 'sans-serif'],
		  },
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
			"green-50": "#E8F7EF",
			"green-100": "#B8E7CD",
			"green-200": "#96DCB5",
			"green-300": "#66CC94",
			"green-400": "#48C27F",
			"green-500": "#2FAA6A",
			"green-600": "#18A356",
			"green-700": "#127F43",
			"green-800": "#0E6234",
			"green-900": "#0B4B28",
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
