import { useContext, useEffect } from "react";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import Logo from "../../assets/logo.svg";

export default function HomePage() {
	const { isDarkMode } = useContext(ThemeContext);
	useEffect(() => {
		document.title = "Patel Notes | Home";
	}, []);
	return (
		<div
			className={`w-full h-screen bg-${
				isDarkMode ? "darkMode-background" : "lightMode-background"
			}`}
		>
			<div className="grid grid-cols-4 grid-rows-6 h-full">
				<div className="col-start-1 col-end-2 row-start-1 row-end-2 flex items-center justify-center  p-4 text-center">
					<img src={Logo} alt="Logo" className="h-8 mr-2" />
					<h1 className="text-2xl font-regular text-gray-900 dark:text-white">
						Petal Notes
					</h1>
				</div>

				<div className="col-start-1 col-end-2 row-start-2 row-end-5  flex items-center justify-center">
					<div className="flex flex-col items-center justify-center gap-5 p-5 w-5/6 bg-lightMode-background dark: bg-black rounded-2xl h-5/6">
						<div className="w-full h-full p-4 bg-slate-50  rounded-2xl">
							Task
						</div>
						<div className="w-full h-3/4 p-4 bg-slate-50  rounded-2xl">
							Task
						</div>
						<div className="w-full h-3/4 p-4 bg-slate-50  rounded-2xl">
							Task
						</div>
						<div className="w-full h-3/4 p-4 bg-slate-50  rounded-2xl">
							Task
						</div>
						<input className="w-3/4 p-4 rounded-2xl"></input>
					</div>
				</div>

				<div className="col-start-1 col-end-2 row-start-5 row-end-7 bg-orange-500">
					Task Status
				</div>

				<div className="col-start-2 col-end-4 row-start-1 row-end-2 bg-green-500 p-4 flex justify-between align-middle">
					<div className="text-black dark:text-white border w-4/5 "></div>
				</div>
				<div className="col-start-4 col-end-5 row-start-1 row-end-2 bg-red-500">
					Date
				</div>
				<div className="col-start-2 col-end-5 row-start-2 row-end-4 bg-purple-400">
					Current Tasks
				</div>
				<div className="col-start-2 col-end-5 row-start-4 row-end-6 bg-cyan-400">
					AI Suggestions
				</div>
				<div className="col-start-2 col-end-5 row-start-6 row-end-7 bg-pink-400">
					Ask AI
				</div>
			</div>
		</div>
	);
}
