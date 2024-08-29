import { useContext, useState, useCallback, useEffect } from "react";
import CurrentTasks from "../../components/task-list/CurrentTasks";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import Logo from "../../assets/logo.svg";
import UserContext from "../../contexts/UserContext/UserContext";
import TaskStatus from "../../components/task-list/TaskStatus";
import ThemeToggleButton from "../../components/common/theme-button/ToggleThemeButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TaskList from "../../components/task-list/TaskList";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../components/common/header/Header";
const api = axios.create({
	baseURL: "http://localhost:3009",
});

export default function HomePage() {
	const navigate = useNavigate();
	const { isDarkMode } = useContext(ThemeContext);
	const { currentUser, logout } = useContext(UserContext);
	const [currentTask, setCurrentTask] = useState(null);
	const [currentDate, setCurrentDate] = useState("");
	const [currentHour, setCurrentHour] = useState("");
	const [nextTask, setNextTask] = useState(null);
	const [tasks, setTasks] = useState([]);

	const updateCurrentAndNextTasks = useCallback((taskList) => {
		console.log("Updating current and next tasks with:", taskList);
		if (Array.isArray(taskList) && taskList.length > 0) {
			setCurrentTask(taskList[0]);
			setNextTask(taskList.length > 1 ? taskList[1] : null);
		} else {
			setCurrentTask(null);
			setNextTask(null);
		}
	}, []);
	const fetchTasks = useCallback(async () => {
		try {
			const response = await api.get("/api/tasks", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});
			console.log("Fetched tasks:", response.data);
			setTasks(response.data);
			updateCurrentAndNextTasks(response.data);
		} catch (err) {
			console.error("Error fetching tasks:", err);
		}
	}, []);

	useEffect(() => {
		document.title = "Patel Notes | Home";

		updateDate();
		const interval = setInterval(updateDate, 60000);

		return () => clearInterval(interval);
	}, []);
	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

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

	const location = useLocation();
	// Determine if the current route is either the login or signup page
	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/signup";

	// Determine if the current route is the About page
	const isAboutPage = location.pathname === "/about";
	const isHomePage = location.pathname === "/";
	const isContactPage = location.pathname === "/contact";

	// const handleTasksUpdate = (current, next) => {
	// 	setCurrentTask(current);
	// 	setNextTask(next);
	// };

	const handleTasksUpdate = useCallback(
		(updatedTaskOrTasks) => {
			console.log("handleTasksUpdate received:", updatedTaskOrTasks);
			if (updatedTaskOrTasks === null) {
				console.warn(
					"Received null in handleTasksUpdate, fetching tasks again"
				);
				fetchTasks();
				return;
			}

			let updatedTasks;
			if (Array.isArray(updatedTaskOrTasks)) {
				updatedTasks = updatedTaskOrTasks;
			} else if (
				typeof updatedTaskOrTasks === "object" &&
				updatedTaskOrTasks !== null
			) {
				updatedTasks = tasks.map((task) =>
					task._id === updatedTaskOrTasks._id
						? updatedTaskOrTasks
						: task
				);
			} else {
				console.error(
					"handleTasksUpdate received invalid data:",
					updatedTaskOrTasks
				);
				return;
			}

			setTasks(updatedTasks);
			updateCurrentAndNextTasks(updatedTasks);
		},
		[tasks, fetchTasks, updateCurrentAndNextTasks]
	);

	const handleCompleteTask = useCallback(
		async (taskId) => {
			console.log("Completing task:", taskId);
			try {
				await api.delete(`/api/tasks/${taskId}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				});
				const updatedTasks = tasks.filter(
					(task) => task._id !== taskId
				);
				setTasks(updatedTasks);
				updateCurrentAndNextTasks(updatedTasks);
			} catch (err) {
				console.error("Error completing task:", err);
			}
		},
		[tasks, updateCurrentAndNextTasks]
	);
	const checkTime = (hour) => {
		if (hour >= 6 && hour < 12) {
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

				<TaskList onTasksUpdate={handleTasksUpdate} tasks={tasks} />

				{/* Task Status */}
				{/* Header with Logout Button */}
				<div className="col-start-2 col-end-3 row-start-1 row-end-2 bg-lightMode-background dark:bg-black p-4 flex justify-between items-center rounded-2xl">
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
					</div>
				</div>

				<div className="col-start-3 col-end-4 row-start-1 row-end-2 bg-lightMode-background dark:bg-darkMode-background rounded-2xl shadow-md">
					<nav className="h-full flex items-center justify-center">
						{!isAboutPage && (
							<Link
								to="/about"
								className="mx-4 text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
							>
								About
							</Link>
						)}
						{!isHomePage && (
							<Link
								to="/"
								className="mx-4 text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
							>
								Home
							</Link>
						)}
						{!isContactPage && (
							<Link
								to="/contact"
								className="mx-4 text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
							>
								Contact
							</Link>
						)}
					</nav>
				</div>
				{/* Date */}
				<div className="col-start-4 col-end-5 row-start-1 row-end-2 bg-lightMode-buttonHover dark:bg-darkMode-buttonHover rounded-2xl flex items-center justify-center text-black dark:text-white text-xl">
					{currentDate}
				</div>

				{/* Current Tasks */}
				<CurrentTasks
					currentTask={currentTask}
					nextTask={nextTask}
					onTasksUpdate={handleCompleteTask}
				/>
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
