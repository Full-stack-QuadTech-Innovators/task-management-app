import React, {
	useContext,
	useState,
	useCallback,
	useEffect,
	useRef,
} from "react";
import axiosInstance from "../../axiosInterceptor";
import CurrentTasks from "../../components/task-list/CurrentTasks";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import Logo from "../../assets/logo.svg";
import UserContext from "../../contexts/UserContext/UserContext";
import ThemeToggleButton from "../../components/common/theme-button/ToggleThemeButton";
import { useNavigate, Link, useLocation } from "react-router-dom";
import TaskList from "../../components/task-list/TaskList";
import { Mistral } from "@mistralai/mistralai";
let mistral;
const api = import.meta.env.VITE_MISTRAL_API;
try {
	mistral = new Mistral({
		apiKey: api ?? "",
	});
	console.log("Mistral client initialized successfully");
} catch (error) {
	console.error("Error initializing Mistral client:", error);
}

export default function HomePage() {
	const navigate = useNavigate();
	const { isDarkMode } = useContext(ThemeContext);
	const { currentUser, logout } = useContext(UserContext);
	const [currentTask, setCurrentTask] = useState(null);
	const [currentDate, setCurrentDate] = useState("");
	const [currentHour, setCurrentHour] = useState("");
	const [nextTask, setNextTask] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [mistralOutput, setMistralOutput] = useState("");
	const [userInput, setUserInput] = useState("");
	const [error, setError] = useState(null);
	const chatContainerRef = useRef(null);

	const updateCurrentAndNextTasks = useCallback((taskList) => {
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
			const response = await axiosInstance.get("/api/tasks", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});
			setTasks(response.data);
			updateCurrentAndNextTasks(response.data);
		} catch (err) {
			console.error("Error fetching tasks:", err);
			setError("Failed to fetch tasks. Please try again later.");
		}
	}, [updateCurrentAndNextTasks]);

	useEffect(() => {
		document.title = "Petal Notes | Home";
		updateDate();
		const interval = setInterval(updateDate, 60000);
		fetchTasks();
		return () => clearInterval(interval);
	}, [fetchTasks]);

	useEffect(() => {
		if (currentTask) {
			sendCurrentTaskToMistral(currentTask.content);
		}
	}, [currentTask]);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [mistralOutput]);

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
	const isAboutPage = location.pathname === "/about";
	const isHomePage = location.pathname === "/";
	const isContactPage = location.pathname === "/contact";

	const handleTasksUpdate = useCallback(
		(updatedTaskOrTasks) => {
			if (updatedTaskOrTasks === null) {
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
			try {
				await axiosInstance.delete(`/api/tasks/${taskId}`, {
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
				setError("Failed to complete task. Please try again.");
			}
		},
		[tasks, updateCurrentAndNextTasks]
	);

	const checkTime = (hour) => {
		if (hour >= 6 && hour < 12) return "Morning";
		else if (hour >= 12 && hour < 18) return "Afternoon";
		else if (hour >= 18 && hour < 21) return "Evening";
		else return "Night";
	};

	const sendToMistral = async (prompt) => {
		if (!mistral) {
			console.error("Mistral client is not initialized");
			setMistralOutput(
				(prevOutput) =>
					prevOutput + "\n\nError: Mistral client is not initialized."
			);
			return;
		}
		try {
			const result = await mistral.chat.complete({
				model: "mistral-large-2407",
				messages: [
					{
						content: prompt,
						role: "user",
					},
				],
			});
			setMistralOutput(
				(prevOutput) =>
					prevOutput +
					"\n\nMistral: " +
					result.choices[0].message.content
			);
		} catch (error) {
			console.error("Error interacting with Mistral:", error);
			setMistralOutput(
				(prevOutput) =>
					prevOutput +
					"\n\nError interacting with Mistral. Please try again."
			);
		}
	};

	const sendCurrentTaskToMistral = async (taskTitle) => {
		const prompt = `My current task is: ${taskTitle}. Can you provide a short, set of instructions as to how to complete it?`;
		try {
			const response = await sendToMistral(prompt);
			setMistralOutput((prevOutput) => prevOutput + "\n\n");
		} catch (error) {
			console.error("Error sending task to Mistral:", error);
			setMistralOutput(
				(prevOutput) =>
					prevOutput +
					"\n\nError: Failed to get AI response for the current task."
			);
		}
	};

	const handleUserInput = async () => {
		if (userInput.trim()) {
			setMistralOutput(
				(prevOutput) => prevOutput + "\n\nYou: " + userInput
			);
			try {
				const response = await sendToMistral(userInput);
				setMistralOutput(
					(prevOutput) => prevOutput + "\n\n" + response
				);
			} catch (error) {
				console.error("Error sending user input to Mistral:", error);
				setMistralOutput(
					(prevOutput) =>
						prevOutput + "\n\nError: Failed to get AI response."
				);
			}
			setUserInput("");
		}
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleUserInput();
		}
	};

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

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
						<Link
							to="/chat"
							className="mx-4 text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
						>
							Chat
						</Link>
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

				{/* Mistral Chat */}
				<div
					ref={chatContainerRef}
					className="col-start-2 col-end-5 row-start-4 row-end-6 bg-lightMode-topTask dark:bg-darkMode-topTask rounded-2xl p-4 overflow-y-auto"
				>
					<div className="text-black dark:text-white text-left ">
						<pre className="whitespace-pre-wrap">
							{mistralOutput}
						</pre>
					</div>
				</div>

				{/* Ask AI */}
				<div className="col-start-2 col-end-5 row-start-6 row-end-7 rounded-2xl p-4 flex items-center">
					<input
						type="text"
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
						onKeyDown={handleKeyDown}
						className="flex-grow p-3 rounded-xl bg-lightMode-button dark:bg-darkMode-topTask text-white w-2/4 placeholder-gray-500"
						placeholder="Ask me anything..."
					/>
					{/* <button
						onClick={handleUserInput}
						className="ml-4 bg-lightMode-buttonHover dark:bg-darkMode-topTask text-white px-4 py-2 rounded-xl"
					>
						Send
					</button> */}
				</div>
			</div>
		</div>
	);
}
