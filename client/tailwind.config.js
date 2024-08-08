module.exports = {
	theme: {
		extend: {
			colors: {
				lightMode: {
					background: "#F3F0E8",
					foreground: "#000000",
					button: "#EEE5D0",
					buttonHover: "#DDD0B0", // Add hover color
				},
				darkMode: {
					background: "#2A2A2A",
					foreground: "#FFFFFF",
					button: "#202020",
					containerBlack: "#222222",
					buttonHover: "#1A1A1A", // Add hover color
				},
			},
		},
	},
	darkMode: "class", // Enable dark mode with class
	variants: {},
	plugins: [],
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
};
