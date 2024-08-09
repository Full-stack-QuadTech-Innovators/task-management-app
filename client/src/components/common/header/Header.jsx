import React from "react";
import { useLocation } from "react-router-dom";
import ToggleThemeButton from "../theme-button/ToggleThemeButton";
import LogoComponent from "../ui/LogoComponent";

function Header() {
	const location = useLocation();

	// Determine if the current route is either the login or signup page
	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/signup";

	return (
		<header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-lightMode-background dark:bg-darkMode-background z-50">
			<LogoComponent />
			{!isAuthPage && (
				<nav>
					{/* Add your nav links here */}
					<a href="/about" className="mx-2">
						About
					</a>
					<a href="/contact" className="mx-2">
						Contact
					</a>
					{/* Add more links as needed */}
				</nav>
			)}
			<ToggleThemeButton />
		</header>
	);
}

export default Header;
