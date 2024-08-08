import React from "react";
import { useContext } from "react";
import ThemeContext from "../../../contexts/ThemeContext/ThemeContext";
function ContinueButton() {
	const { isDarkMode } = useContext(ThemeContext);
	return (
		<button
			className={`w-full px-4 py-3 font-regular${
				isDarkMode
					? "text-darkMode-foreground bg-darkMode-button hover:bg-darkMode-button-hover"
					: "text-lightMode-foreground bg-lightMode-button hover:bg-lightMode-button-hover"
			} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
			type="button"
		>
			Continue
		</button>
	);
}

export default ContinueButton;
