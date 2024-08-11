// ThemeToggleButton.js
import React, { useContext } from "react";
import ThemeContext from "../../../contexts/ThemeContext/ThemeContext";
import { Switch as ShadSwitch } from "../ui/switch";

const ThemeToggleButton = () => {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	return (
		<div className="flex items-center justify-center space-x-4">
			<label
				htmlFor="theme-toggle"
				className="text-lg text-black dark:text-white"
			>
				{isDarkMode ? "Dark Mode" : "Light Mode"}
			</label>
			<ShadSwitch
				id="theme-toggle"
				checked={isDarkMode}
				onCheckedChange={toggleTheme}
			/>
		</div>
	);
};

export default ThemeToggleButton;
