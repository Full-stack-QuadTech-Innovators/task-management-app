import { useLocation, Link } from "react-router-dom";
import ToggleThemeButton from "../theme-button/ToggleThemeButton";
import LogoComponent from "../ui/LogoComponent";
import { Switch as ShadSwitch } from "../ui/switch";
import { useContext } from "react";
import ThemeContext from "../../../contexts/ThemeContext/ThemeContext";
function Header() {
	const location = useLocation();
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	// Determine if the current route is either the login or signup page
	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/signup";

	// Determine if the current route is the About page
	const isAboutPage = location.pathname === "/about";
	const isHomePage = location.pathname === "/";
	const isContactPage = location.pathname === "/contact";

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
					{!isContactPage && (
						<Link to="/contact" className="mx-2">
							Contact
						</Link>
					)}
					{/* Add more links as needed */}
				</nav>
			)}
			<ToggleThemeButton />
		</header>
	);
}

export default Header;
