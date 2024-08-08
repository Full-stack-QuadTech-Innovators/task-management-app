import { useState, useEffect } from "react";

import ThemeContext from "./ThemeContext";
const ThemeContextProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			return savedTheme === "dark";
		} else {
			return window.matchMedia("(prefers-color-scheme: dark)").matches;
		}
	});

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	const respectSystemPreference = () => {
		localStorage.removeItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		setIsDarkMode(prefersDark);
	};

	return (
		<ThemeContext.Provider
			value={{ isDarkMode, toggleTheme, respectSystemPreference }}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;
