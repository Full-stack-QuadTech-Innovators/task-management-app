import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import Header from "../../components/common/header/Header";
import { Link } from "react-router-dom";

const NotFound = () => {
	const { isDarkMode } = useContext(ThemeContext);

	return (
		<div
			className={
				isDarkMode
					? "bg-darkMode-background text-darkMode-foreground"
					: "bg-lightMode-background text-lightMode-foreground"
			}
		>
			<Header />
			<div
				className={`flex items-center justify-center min-h-screen text-center p-4`}
			>
				<div className="w-full max-w-md p-8 space-y-6">
					<h2 className="text-4xl font-bold">404 - Page Not Found</h2>
					<p className="text-lg leading-relaxed">
						Sorry, the page you are looking for does not exist.
					</p>
					<Link
						to="/"
						className={`inline-block mt-4 px-6 py-2 text-base font-semibold rounded-md ${
							isDarkMode
								? "bg-lightMode-background text-darkMode-foreground border border-darkMode-foreground"
								: "bg-darkMode-background text-lightMode-foreground border border-lightMode-foreground"
						} focus:outline-none focus:ring-2 focus:ring-blue-500`}
					>
						Go Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
