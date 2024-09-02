// import { useEffect, useContext } from "react";
// import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
// import { Switch as ShadSwitch } from "@radix-ui/react-switch";
// import { Button as shadButton } from "../../components/common/ui/button";
// import Header from "../../components/common/header/Header";

// const About = () => {
// 	const { isDarkMode } = useContext(ThemeContext);
// 	useEffect(() => {
// 		document.title = "Petal Notes | About";
// 	}, []);
// 	return (
// 		<div
// 			className={
// 				isDarkMode
// 					? "bg-darkMode-background text-darkMode-foreground"
// 					: "bg-lightMode-background text-lightMode-foreground"
// 			}
// 		>
// 			<Header />
// 			<div
// 				className={`flex items-center justify-center min-h-screen
// 				}`}
// 			>
// 				<div className="w-full max-w-2xl p-8 space-y-6">
// 					<h2 className="text-3xl text-center">About Petal Notes</h2>
// 					<p className="text-lg leading-relaxed">
// 						Welcome to Petal Notes, the ultimate task management app
// 						designed to help you stay organized and productive.
// 						Whether you're managing personal tasks or collaborating
// 						on a project, Petal Notes offers a user-friendly
// 						interface that makes task management a breeze.
// 					</p>
// 					<p className="text-lg leading-relaxed">
// 						Our app is designed with both light and dark modes to
// 						ensure that you can work comfortably in any environment.
// 						With Petal Notes, you can easily create, edit, and track
// 						your tasks, all while enjoying a sleek and modern
// 						design.
// 					</p>
// 					<p className="text-lg leading-relaxed">
// 						Petal Notes is perfect for professionals, students, and
// 						anyone who wants to stay on top of their to-do list.
// 						Join us on our journey to making task management more
// 						efficient and enjoyable!
// 					</p>
// 					<ShadSwitch />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

import { useEffect, useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import { Switch as ShadSwitch } from "../../../src/components/common/ui/switch";
import Header from "../../components/common/header/Header";

const About = () => {
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);

	useEffect(() => {
		document.title = "Petal Notes | About";
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
				<div className="w-full max-w-2xl p-8 space-y-6">
					<h2 className="text-3xl text-center">About Petal Notes</h2>
					<p className="text-lg leading-relaxed">
						Welcome to Petal Notes, the ultimate task management app
						designed to help you stay organized and productive.
						Whether you're managing personal tasks or collaborating
						on a project, Petal Notes offers a user-friendly
						interface that makes task management a breeze.
					</p>
					<p className="text-lg leading-relaxed">
						Our app is designed with both light and dark modes to
						ensure that you can work comfortably in any environment.
						With Petal Notes, you can easily create, edit, and track
						your tasks, all while enjoying a sleek and modern
						design.
					</p>
					<p className="text-lg leading-relaxed">
						Petal Notes is perfect for professionals, students, and
						anyone who wants to stay on top of their to-do list.
						Join us on our journey to making task management more
						efficient and enjoyable!
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
