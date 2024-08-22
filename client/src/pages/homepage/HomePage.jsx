import { useContext, useState, useEffect } from "react";
import CurrentTasks from "../../components/task-list/CurrentTasks";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import Logo from "../../assets/logo.svg";
import UserContext from "../../contexts/UserContext/UserContext";
import ThemeToggleButton from "../../components/common/theme-button/ToggleThemeButton";
import { useNavigate } from "react-router-dom";
import TaskList from "../../components/task-list/TaskList";

export default function HomePage() {
	const navigate = useNavigate();
	const { isDarkMode } = useContext(ThemeContext);
	const { currentUser, logout } = useContext(UserContext);
	const [currentTask, setCurrentTask] = useState(null);
	const [currentDate, setCurrentDate] = useState("");
	const [currentHour, setCurrentHour] = useState("");
	const [nextTask, setNextTask] = useState(null);

	useEffect(() => {
		document.title = "Patel Notes | Home";
		updateDate();
		const interval = setInterval(updateDate, 60000);
		return () => clearInterval(interval);
	}, []);

	const updateDate = () => {
		const now = new Date();
		const options = { day: "2-digit", month: "short", year: "numeric" };
		setCurrentDate(now.toLocaleDateString("en-US", options));
		setCurrentHour(now.getHours());
	};

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	const handleTasksUpdate = (current, next) => {
		setCurrentTask(current);
		setNextTask(next);
	};

	const checkTime = (hour) => {
		if (hour >= 0 && hour < 12) {
			return "Morning";
		} else if (hour >= 12 && hour < 18) {
			return "Afternoon";
		} else if (hour >= 18 && hour < 21) {
			return "Evening";
		} else {
			return "Night";
		}
	};
	return (
		<div
			className={`w-full min-h-screen bg-${
				isDarkMode ? "darkMode-background" : "white"
			}`}
		>
			<div className="grid grid-cols-4 grid-rows-6 h-screen gap-4 p-4">
				{/* Logo, Title, and Theme Toggle */}
				<div className="col-start-1 col-end-2 row-start-1 row-end-2 flex items-center justify-between p-4">
					<div className="flex items-center">
						<img src={Logo} alt="Logo" className="h-8 mr-2" />
						<h1 className="text-2xl font-regular text-gray-900 dark:text-white">
							Petal Notes
						</h1>
					</div>
					<ThemeToggleButton />
				</div>

				<TaskList onTasksUpdate={handleTasksUpdate} />

				{/* Task Status */}
				<div className="col-start-1 col-end-2 row-start-5 row-end-7 bg-lightMode-background dark:bg-darkMode-containerBlack rounded-2xl p-4 overflow-y-auto">
					{[
						"25/07/2024",
						"24/07/2024",
						"23/07/2024",
						"22/07/2024",
						,
					].map((date, index) => (
						<div
							key={index}
							className="flex justify-around items-center  text-center mb-2 w-full"
						>
							<span className="text-black dark:text-white bg-lightMode-normalDate dark:bg-darkMode-normalDate rounded-2xl w-64 h-11 ">
								{date}
							</span>
							<div className="w-10  h-10 bg-white rounded-full flex items-center justify-center">
								<span className="text-lightMode-percentageTop dark:text-darkMode-percentageTop font-bold text-sm p-2">
									{100 - index * 5}%
								</span>
							</div>
						</div>
					))}
				</div>

				{/* Header with Logout Button */}
				<div className="col-start-2 col-end-4 row-start-1 row-end-2 bg-lightMode-background dark:bg-black p-4 flex justify-between items-center rounded-2xl">
					<div className="text-black dark:text-white text-xl">
						{"  Good "}
						{checkTime(currentHour)},{" "}
						{currentUser
							? currentUser.username || currentUser.email
							: "Guest"}
					</div>
					<div className="flex items-center">
						<button
							onClick={handleLogout}
							className="mr-4 bg-lightMode-buttonHover dark:bg-darkMode-buttonHover text-black dark:text-white px-4 py-2 rounded-xl hover:bg-opacity-80 transition-colors duration-200"
						>
							Logout
						</button>
						<div className="w-12 h-12 bg-white rounded-full"></div>
					</div>
				</div>
				{/* Date */}
				<div className="col-start-4 col-end-5 row-start-1 row-end-2 bg-lightMode-buttonHover dark:bg-darkMode-buttonHover rounded-2xl flex items-center justify-center text-black dark:text-white text-xl">
					{currentDate}
				</div>

				{/* Current Tasks */}
				<CurrentTasks currentTask={currentTask} nextTask={nextTask} />
				{/* AI Suggestions */}
				<div className="col-start-2 col-end-5 row-start-4 row-end-6 bg-lightMode-topTask dark:bg-darkMode-topTask rounded-2xl p-4 overflow-y-auto">
					<div className="text-black dark:text-white text-center ">
						<h3 className="mb-2 font-bold">
							Here's a short and concise list of steps to take
							your pumpkin for a walk:
						</h3>
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
				<div className="col-start-2 col-end-5 row-start-6 row-end-7  rounded-2xl p-4 flex items-center">
					<input
						className="flex-grow p-3 rounded-xl bg-lightMode-button dark:bg-darkMode-topTask text-gray-900 w-2/4  placeholder-gray-500"
						placeholder="Ask me anything..."
					/>
					<button className="ml-4 bg-lightMode-buttonHover dark:bg-darkMode-topTask text-white px-4 py-2 rounded-xl">
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
