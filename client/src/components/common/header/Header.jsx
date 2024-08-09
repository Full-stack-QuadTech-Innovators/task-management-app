import React from "react";
import { useLocation, Link } from "react-router-dom";
import ToggleThemeButton from "../theme-button/ToggleThemeButton";
import LogoComponent from "../ui/LogoComponent";

function Header() {
	const location = useLocation();

	// Determine if the current route is either the login or signup page
	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/signup";

	// Determine if the current route is the About page
	const isAboutPage = location.pathname === "/about";
	const isHomePage = location.pathname === "/";

	return (
		<header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-lightMode-background dark:bg-darkMode-background z-50">
			<LogoComponent />
			{!isAuthPage && (
				<nav>
					{!isAboutPage && (
						<Link to="/about" className="mx-2">
							About
						</Link>
					)}
					{!isHomePage && (
						<Link to="/" className="mx-2">
							Home
						</Link>
					)}
					<Link to="/contact" className="mx-2">
						Contact
					</Link>

					{/* Add more links as needed */}
				</nav>
			)}
			<ToggleThemeButton />
		</header>
	);
}

export default Header;
