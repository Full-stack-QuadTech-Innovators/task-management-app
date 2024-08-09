import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import Header from "../../components/common/header/Header";

const About = () => {
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
				<div className="w-full max-w-2xl p-8 space-y-6">
					<h2 className="text-3xl text-center">About Patel Notes</h2>
					<p className="text-lg leading-relaxed">
						Welcome to Patel Notes, the ultimate task management app
						designed to help you stay organized and productive.
						Whether you're managing personal tasks or collaborating
						on a project, Patel Notes offers a user-friendly
						interface that makes task management a breeze.
					</p>
					<p className="text-lg leading-relaxed">
						Our app is designed with both light and dark modes to
						ensure that you can work comfortably in any environment.
						With Patel Notes, you can easily create, edit, and track
						your tasks, all while enjoying a sleek and modern
						design.
					</p>
					<p className="text-lg leading-relaxed">
						Patel Notes is perfect for professionals, students, and
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
