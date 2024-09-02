import { useEffect, useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import Header from "../../components/common/header/Header";
import Label from "../../components/common/label/Label";
import ContinueButton from "../../components/common/submit-button/ContinueButton";

const Contact = () => {
	const { isDarkMode } = useContext(ThemeContext);
	useEffect(() => {
		document.title = "Petal Notes | Contact";
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
			<div
				className={`flex items-center justify-center min-h-screen
				}`}
			>
				<div className="w-full max-w-lg p-8 space-y-6">
					<h2 className="text-3xl text-center">Contact Us</h2>
					<p className="text-lg leading-relaxed text-center">
						If you have any questions or feedback, feel free to
						reach out to us. We would love to hear from you!
					</p>
					<form>
						<div className="mb-4">
							<Label value={"Name"} />
							<input
								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
									isDarkMode
										? "bg-darkMode-background text-darkMode-foreground"
										: "bg-lightMode-background text-lightMode-foreground"
								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
								id="name"
								type="text"
							/>
						</div>
						<div className="mb-4">
							<Label value={"Email"} />
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
							<Label value={"Message"} />
							<textarea
								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
									isDarkMode
										? "bg-darkMode-background text-darkMode-foreground"
										: "bg-lightMode-background text-lightMode-foreground"
								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
								id="message"
								rows="4"
							/>
						</div>
						<div className="flex items-center justify-center">
							<ContinueButton />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Contact;
