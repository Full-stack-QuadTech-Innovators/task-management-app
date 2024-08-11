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
			className={`w-full min-h-screen bg-${
				isDarkMode ? "darkMode-background" : "white"
			}`}
		>
			<div className="grid grid-cols-4 grid-rows-6 h-screen gap-4 p-4">
				{/* Logo and Title */}
				<div className="col-start-1 col-end-2 row-start-1 row-end-2 flex items-center justify-center p-4 text-center">
					<img src={Logo} alt="Logo" className="h-8 mr-2" />
					<h1 className="text-2xl font-regular text-gray-900 dark:text-white">
						Petal Notes
					</h1>
				</div>

				<div className="col-start-1 col-end-2 row-start-2 row-end-5 flex items-center justify-center">
					<div className="flex flex-col items-center justify-center gap-4 p-5 w-5/6 bg-lightMode-background dark:bg-darkMode-containerBlack rounded-2xl h-5/6">
						{[
							"Take my pumpkin for a walk",
							"Water the petunias",
							"Get a haircut",
							"Play the guitar",
						].map((task, index) => (
							<div
								key={index}
								className={`w-full p-4 rounded-2xl text-center ${
									index === 0
										? "bg-lightMode-topTask dark:bg-darkMode-topTask text-black dark:text-white h-16" // First task
										: "bg-lightMode-normalTask  dark:bg-darkMode-normalTask text-black dark:text-white h-12"
								}`}
							>
								{task}
							</div>
						))}
						<input
							className="w-full p-4 bg-transparent border-b-2 border-black dark:border-white text-gray-900 dark:text-white placeholder-gray-500 text-center focus:outline-none"
							placeholder="Add a task"
						/>
					</div>
				</div>

				{/* Task Status */}
				<div className="col-start-1 col-end-2 row-start-5 row-end-7 bg-lightMode-background dark:bg-darkMode-containerBlack rounded-2xl p-4 overflow-y-auto">
					{[
						"25/07/2024",
						"24/07/2024",
						"23/07/2024",
						"22/07/2024",
						"21/07/2024",
					].map((date, index) => (
						<div
							key={index}
							className="flex justify-around items-center  text-center mb-2 w-full"
						>
							<span className="text-black dark:text-white bg-lightMode-normalDate dark:bg-darkMode-normalDate rounded-2xl w-64 h-11 ">
								{date}
							</span>
							<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
								<span className="text-lightMode-percentageTop dark:text-darkMode-percentageTop font-bold">
									{100 - index * 5}%
								</span>
							</div>
						</div>
					))}
				</div>

				{/* Header */}
				<div className="col-start-2 col-end-4 row-start-1 row-end-2 bg-lightMode-background dark:bg-black p-4 flex justify-between items-center rounded-2xl">
					<div className="text-white text-xl bg-lightmo">
						Hello, Michael
					</div>
					<div className="w-12 h-12 bg-white rounded-full"></div>
				</div>

				{/* Date */}
				<div className="col-start-4 col-end-5 row-start-1 row-end-2 bg-red-500 rounded-2xl flex items-center justify-center text-white text-xl">
					25 Jul 2024
				</div>

				{/* Current Tasks */}
				<div className="col-start-2 col-end-5 row-start-2 row-end-4  rounded-2xl p-4">
					<h2 className="text-2xl font-semibold text-white mb-4">
						Current Task
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-purple-600 p-4 rounded-xl text-white">
							<h3 className="font-semibold mb-2">Current Task</h3>
							<p>Take my pumpkin for a walk</p>
						</div>
						<div className="bg-purple-600 p-4 rounded-xl text-white">
							<h3 className="font-semibold mb-2">Next Task</h3>
							<p>Water the petunias</p>
						</div>
					</div>
				</div>

				{/* AI Suggestions */}
				<div className="col-start-2 col-end-5 row-start-4 row-end-6 bg-lightMode-topTask dark:bg-darkMode-topTask rounded-2xl p-4 overflow-y-auto">
					<h2 className="text-2xl font-semibold text-white mb-4">
						AI Suggestions
					</h2>
					<div className="text-white">
						<p className="mb-2">
							Here's a short and concise list of steps to take
							your pumpkin for a walk:
						</p>
						<ol className="list-decimal list-inside space-y-2">
							<li>
								Choose a small to medium-sized pumpkin that is
								not too heavy to carry.
							</li>
							<li>
								Create a simple "leash" using a string or rope.
								Tie one end securely around the pumpkin's stem.
							</li>
							<li>
								Pick a safe and pleasant route for your walk,
								preferably a quiet neighborhood street or a park
								path.
							</li>
							<li>
								Carry the pumpkin gently by the bottom or use a
								bag to make it easier.
							</li>
							<li>
								Begin your walk, keeping a comfortable pace.
								Remember, this is a fun activity, not a race.
							</li>
							<li>
								Take photos to document your unique walk.
								Capture the pumpkin with interesting
								backgrounds.
							</li>
							<li>
								Once you've completed your route, head back
								home.
							</li>
							<li>
								After your walk, place the pumpkin in a cool,
								dry place, especially if you plan to carve it
								later.
							</li>
						</ol>
					</div>
				</div>

				{/* Ask AI */}
				<div className="col-start-2 col-end-5 row-start-6 row-end-7 bg-pink-400 rounded-2xl p-4 flex items-center">
					<input
						className="flex-grow p-3 rounded-xl bg-white text-gray-900 placeholder-gray-500"
						placeholder="Ask me anything..."
					/>
					<button className="ml-4 bg-pink-600 text-white px-4 py-2 rounded-xl">
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
