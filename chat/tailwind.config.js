/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
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
			colors: {
				lightMode: {
					background: "#F3F0E8",
					foreground: "#000000",
					button: "#EEE5D0",
					buttonHover: "#DDD0B0",
					topTask: "#DCFFD0",
					normalTask: "#D0E8FF",
					topDate: "#FFA5CD",
					normalDate: "#FFD2F5",
					percentageNormal: "#D7A2E0",
					percentageTop: "#DC70A3",
				},
				darkMode: {
					background: "#2A2A2A",
					foreground: "#FFFFFF",
					button: "#202020",
					containerBlack: "#222222",
					buttonHover: "#1A1A1A",
					topTask: "#334D31",
					normalTask: "#31464C",
					topDate: "#4C314D",
					normalDate: "#3A314D",
					percentageNormal: "#866EB7",
					percentageTop: "#B16EB7",
				},
			},
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
		},
	},
	plugins: [require("tailwindcss-animate")],
};
