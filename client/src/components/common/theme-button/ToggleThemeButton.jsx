// ThemeToggleButton.js
import React, { useContext } from "react";
import ThemeContext from "../../../contexts/ThemeContext/ThemeContext";
const ThemeToggleButton = () => {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	return (
		<button onClick={toggleTheme}>
			{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
		</button>
	);
};

export default ThemeToggleButton;
