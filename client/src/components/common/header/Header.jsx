import ToggleThemeButton from "../theme-button/ToggleThemeButton";
import Logo from "../../../assets/logo.svg"; // Import the SVG logo

function Header() {
	return (
		<header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-lightMode-backfround dark:bg-darkMode-background z-50">
			<div className="flex items-center">
				<img src={Logo} alt="Logo" className="h-8 mr-2" />
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
					Petal Notes
				</h1>
			</div>
			<ToggleThemeButton />
		</header>
	);
}

export default Header;
