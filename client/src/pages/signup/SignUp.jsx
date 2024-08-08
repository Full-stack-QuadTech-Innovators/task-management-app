import { useContext, useState } from "react";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import Header from "../../components/common/header/Header";
import Label from "../../components/common/label/Label";
import ContinueButton from "../../components/common/submit-button/ContinueButton";
const SignUp = () => {
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
					<h2 className="text-2xl text-center">Sign Up</h2>
					<form>
						<div className="mb-4">
							<Label value={"email"} />
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
							<Label value={"password"} />
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
						<div className="mb-6">
							<Label value={"confirm password"} />
							<input
								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
									isDarkMode
										? "bg-darkMode-background text-darkMode-foreground"
										: "bg-lightMode-background text-lightMode-foreground"
								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
								id="confirm-password"
								type="password"
							/>
						</div>
						<div className="flex items-center justify-between">
							<ContinueButton />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
