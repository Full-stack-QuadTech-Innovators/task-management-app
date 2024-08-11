import React, { useContext, useEffect } from "react";
import Header from "../../components/common/header/Header";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import ContinueButton from "../../components/common/submit-button/ContinueButton";
import Label from "../../components/common/label/Label";
import { Button } from "../../components/common/ui/button";

const Login = () => {
	const { isDarkMode } = useContext(ThemeContext);
	useEffect(() => {
		document.title = "Patel Notes | Login";
	}, []);
	return (
		<div
			className={
				isDarkMode
					? "bg-darkMode-background text-darkMode-foreground"
					: "bg-lightMode-background text-lightMode-foreground"
			}
		>
			<Header />
			<div className={`flex items-center justify-center min-h-screen`}>
				<div className="w-full max-w-md p-8 space-y-6">
					<h2 className="text-2xl text-center">Log In</h2>
					<form>
						<div className="mb-4">
							<Label value={"email"} className="mb-2" />
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
							<Label value={"password"} className="mb-2" />
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
							<ContinueButton />
							{/* <Button>Click me </Button> */}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
