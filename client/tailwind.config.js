module.exports = {
	// content: [
	// 	"./index.html",
	// 	"./src/**/*.{js,jsx,ts,tsx}",
	// 	"./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
	// ],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	theme: {
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
		},
	},
	darkMode: "class",
	variants: {},
	plugins: [],
};
