import React, { useContext } from "react";
import Header from "../../components/common/header/Header";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";

const Login = () => {
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
				className={`flex items-center justify-center min-h-screen
				}`}
			>
				<div className="w-full max-w-md p-8 space-y-6">
					<h2 className="text-2xl text-center">Log In</h2>
					<form>
						<div className="mb-4">
							<label
								className="block mb-2 text-sm font-abeezee font-light"
								htmlFor="email"
							>
								Email
							</label>
							<input
								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
									isDarkMode
										? "bg-darkMode-background text-darkMode-foreground"
										: "bg-lightMode-background text-lightMode-foreground"
								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
								id="email"
								type="email"
							/>
						</div>
						<div className="mb-6">
							<label
								className="block mb-2 text-sm font-abeezee font-light"
								htmlFor="password"
							>
								Password
							</label>
							<input
								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
									isDarkMode
										? "bg-darkMode-background text-darkMode-foreground"
										: "bg-lightMode-background text-lightMode-foreground"
								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
								id="password"
								type="password"
							/>
						</div>
						<div className="flex items-center justify-between">
							<button
								className={`w-full px-4 py-2 font-bold ${
									isDarkMode
										? "text-darkMode-foreground bg-darkMode-button hover:bg-darkMode-button-hover"
										: "text-lightMode-foreground bg-lightMode-button hover:bg-lightMode-button-hover"
								} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
								type="button"
							>
								Continue
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
