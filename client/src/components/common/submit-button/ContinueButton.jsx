import React from "react";
import { useContext } from "react";
import ThemeContext from "../../../contexts/ThemeContext/ThemeContext";

function ContinueButton({
	onClick,
	text = "Continue",
	type = "button",
	disabled = false,
	loading = false,
}) {
	const { isDarkMode } = useContext(ThemeContext);

	return (
		<button
			className={`w-full px-4 py-3 font-regular ${
				isDarkMode
					? "text-darkMode-foreground bg-darkMode-button hover:bg-darkMode-button-hover"
					: "text-lightMode-foreground bg-lightMode-button hover:bg-lightMode-button-hover"
			} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
				disabled || loading ? "opacity-50 cursor-not-allowed" : ""
			}`}
			type={type}
			onClick={onClick}
			disabled={disabled || loading}
		>
			{loading ? "Loading..." : text}
		</button>
	);
}

export default ContinueButton;
