import React, { useEffect } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../components/common/ui/alert-dialog";
import { CircleCheckBig } from "lucide-react";

function CurrentTasks({ currentTask, nextTask, onTasksUpdate }) {
	useEffect(() => {
		console.log("CurrentTasks received props:", { currentTask, nextTask });
	}, [currentTask, nextTask]);
	const handleCompleteTask = (taskId) => {
		console.log("Completing task:", taskId);
		onTasksUpdate(taskId);
	};

	const TaskItem = ({ task, title }) => (
		<div
			className={`bg-lightMode-${
				title === "Current Task" ? "topTask" : "normalTask"
			} dark:bg-darkMode-${
				title === "Current Task" ? "topTask" : "normalTask"
			} p-4 rounded-xl text-white`}
		>
			<h3 className="font-semibold text-black dark:text-white mb-2">
				{title}
			</h3>
			<div className="flex justify-between items-center">
				<p className="text-black dark:text-white flex-grow">
					{task ? task.content : `No ${title.toLowerCase()}`}
				</p>
				{task && (
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<button className="ml-2 px-2 py-1 rounded focus:outline-none border-x-1 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out">
								<CircleCheckBig
									size={30}
									className="transform transition-all duration-200 ease-in-out"
								/>
							</button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className="text-lightMode-foreground dark:text-darkMode-foreground">
									Set this task as completed?
								</AlertDialogTitle>
								<AlertDialogDescription className="text-lightMode-foreground dark:text-darkMode-foreground">
									This action cannot be undone. The task will
									be removed from your list.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel className="text-lightMode-foreground dark:text-darkMode-foreground">
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									className="text-red-700"
									onClick={() => handleCompleteTask(task._id)}
								>
									Complete and Remove
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</div>
		</div>
	);

	return (
		<div className="col-start-2 col-end-5 row-start-2 row-end-4 rounded-2xl p-4">
			<h2 className="text-2xl font-semibold text-white mb-4">
				Current Task
			</h2>
			<div className="grid grid-cols-2 gap-4">
				<TaskItem task={currentTask} title="Current Task" />
				<TaskItem task={nextTask} title="Next Task" />
			</div>
		</div>
	);
}

export default CurrentTasks;

// import React, { useState, useEffect } from "react";
// import {
// 	AlertDialog,
// 	AlertDialogAction,
// 	AlertDialogCancel,
// 	AlertDialogContent,
// 	AlertDialogDescription,
// 	AlertDialogFooter,
// 	AlertDialogHeader,
// 	AlertDialogTitle,
// 	AlertDialogTrigger,
// } from "../../components/common/ui/alert-dialog";
// import { Alert } from "../../components/common/ui/alert";
// import { CircleCheckBig, Pin } from "lucide-react";
// import axios from "axios";
// const api = axios.create({
// 	baseURL: "http://localhost:3009",
// });
// function CurrentTasks({ currentTask, nextTask, onTasksUpdate }) {
// 	const [tasks, setTasks] = useState([]);
// 	const [error, setError] = useState(null);
// 	const [isLoading, setIsLoading] = useState(true);

// 	useEffect(() => {
// 		fetchTasks();
// 	}, []);

// 	const fetchTasks = async () => {
// 		setIsLoading(true);
// 		try {
// 			const response = await api.get("/api/tasks", {
// 				headers: {
// 					Authorization: `Bearer ${localStorage.getItem(
// 						"accessToken"
// 					)}`,
// 				},
// 			});
// 			setTasks(response.data);
// 			setError(null);
// 		} catch (err) {
// 			setError("Failed to fetch tasks");
// 			console.error("Error fetching tasks:", err);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};
// 	const handleDeleteTask = async (taskId) => {
// 		try {
// 			await api.delete(`/api/tasks/${taskId}`, {
// 				headers: {
// 					Authorization: `Bearer ${localStorage.getItem(
// 						"accessToken"
// 					)}`,
// 				},
// 			});
// 			setTasks(tasks.filter((task) => task._id !== taskId));
// 		} catch (err) {
// 			setError("Failed to delete task");
// 			console.error("Error deleting task:", err);
// 		}
// 	};
// 	return (
// 		<div className="col-start-2 col-end-5 row-start-2 row-end-4  rounded-2xl p-4">
// 			<h2 className="text-2xl font-semibold text-white mb-4">
// 				Current Task
// 			</h2>
// 			<div className="grid grid-cols-2 gap-4">
// 				<div className="bg-lightMode-topTask dark:bg-darkMode-topTask p-4 rounded-xl text-white">
// 					<h3 className="font-semibold text-black dark:text-white mb-2">
// 						Current Task
// 					</h3>
// 					<div className="flex justify-between items-center">
// 						<p className="text-black dark:text-white flex-grow">
// 							{currentTask
// 								? currentTask.content
// 								: "No current task"}
// 						</p>
// 						<AlertDialog className="bg-lightMode-background dark:bg-darkMode-background">
// 							<AlertDialogTrigger asChild>
// 								<button
// 									className={`ml-2 px-2 py-1 rounded focus:outline-none border-x-1 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out`}
// 								>
// 									<CircleCheckBig
// 										size={30}
// 										className={`transform transition-all duration-200 ease-in-out`}
// 									/>
// 								</button>
// 							</AlertDialogTrigger>
// 							<AlertDialogContent>
// 								<AlertDialogHeader>
// 									<AlertDialogTitle className="text-lightMode-foreground dark:text-darkMode-foreground">
// 										Set this task as completed?
// 									</AlertDialogTitle>
// 									<AlertDialogDescription className="text-lightMode-foreground dark:text-darkMode-foreground">
// 										This action cannot be undone.
// 									</AlertDialogDescription>
// 								</AlertDialogHeader>
// 								<AlertDialogFooter>
// 									<AlertDialogCancel className="text-lightMode-foreground dark:text-darkMode-foreground">
// 										Cancel
// 									</AlertDialogCancel>
// 									<AlertDialogAction
// 										className="text-red-700"
// 										onClick={() =>
// 											handleDeleteTask(task._id)
// 										}
// 									>
// 										Continue
// 									</AlertDialogAction>
// 								</AlertDialogFooter>
// 							</AlertDialogContent>
// 						</AlertDialog>
// 					</div>
// 				</div>
// 				<div className="bg-lightMode-normalTask dark:bg-darkMode-normalTask p-4 rounded-xl text-white">
// 					<h3 className="font-semibold mb-2 text-black dark:text-white">
// 						Next Task
// 					</h3>
// 					<div className="flex justify-between items-center">
// 						<p className="text-black dark:text-white">
// 							{nextTask ? nextTask.content : "No next task"}
// 						</p>
// 						<AlertDialog>
// 							<AlertDialogTrigger asChild>
// 								<button
// 									className={`ml-2 px-2 py-1 rounded focus:outline-none border-x-1 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out`}
// 								>
// 									<CircleCheckBig
// 										size={30}
// 										className={`transform transition-all duration-200 ease-in-out`}
// 									/>
// 								</button>
// 							</AlertDialogTrigger>
// 							<AlertDialogContent>
// 								<AlertDialogHeader>
// 									<AlertDialogTitle>
// 										Set this task as completed?
// 									</AlertDialogTitle>
// 									<AlertDialogDescription>
// 										This action cannot be undone.
// 									</AlertDialogDescription>
// 								</AlertDialogHeader>
// 								<AlertDialogFooter>
// 									<AlertDialogCancel>
// 										Cancel
// 									</AlertDialogCancel>
// 									<AlertDialogAction
// 										onClick={() =>
// 											handleDeleteTask(task._id)
// 										}
// 									>
// 										Continue
// 									</AlertDialogAction>
// 								</AlertDialogFooter>
// 							</AlertDialogContent>
// 						</AlertDialog>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default CurrentTasks;

// import React, { useState } from "react";
// import { CircleCheckBig, Pin } from "lucide-react";

// function CurrentTasks({ currentTask, nextTask }) {
// 	console.log(currentTask, nextTask	);

// 	const [completedTasks, setCompletedTasks] = useState([]);

// 	const setTaskAsCompleted = (taskId, userId) => {
// 		// Check if the task is already completed
// 		if (!completedTasks.includes(taskId)) {
// 			// Add the task to the list of completed tasks
// 			setCompletedTasks([...completedTasks, taskId]);

// 			// You can add any additional logic here, such as updating the task status in a database
// 			console.log(`Task ${taskId} completed by user ${userId}`);
// 		} else {
// 			// Remove the task from the list of completed tasks
// 			setCompletedTasks(completedTasks.filter((id) => id !== taskId));
// 			console.log(
// 				`Task ${taskId} unmarked as completed by user ${userId}`
// 			);
// 		}
// 	};

// 	return (
// 		<div className="col-start-2 col-end-5 row-start-2 row-end-4  rounded-2xl p-4">
// 			<h2 className="text-2xl font-semibold text-white mb-4">
// 				Current Task
// 			</h2>
// 			<div className="grid grid-cols-2 gap-4">
// 				<div className="bg-lightMode-topTask dark:bg-darkMode-topTask p-4 rounded-xl text-white">
// 					<h3 className="font-semibold text-black dark:text-white mb-2">
// 						Current Task
// 					</h3>
// 					<div className="flex justify-between items-center">
// 						<p className="text-black dark:text-white flex-grow">
// 							{currentTask
// 								? currentTask.content
// 								: "No current task"}
// 						</p>
// 						<button
// 							onClick={() =>
// 								setTaskAsCompleted(currentTask.id, 1)
// 							}
// 							className={`ml-2 px-2 py-1 rounded focus:outline-none border-x-1 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out`}
// 						>
// 							<CircleCheckBig
// 								size={30}
// 								className={`transform transition-all duration-200 ease-in-out ${
// 									completedTasks.includes(currentTask.id)
// 										? "text-green-500"
// 										: "text-gray-400"
// 								}`}
// 							/>
// 						</button>
// 					</div>
// 				</div>
// 				<div className="bg-lightMode-normalTask dark:bg-darkMode-normalTask p-4 rounded-xl text-white">
// 					<h3 className="font-semibold mb-2 text-black dark:text-white">
// 						Next Task
// 					</h3>
// 					<div className="flex justify-between items-center">
// 						<p className="text-black dark:text-white">
// 							{nextTask ? nextTask.content : "No next task"}
// 						</p>
// 						<button
// 							onClick={() => setTaskAsCompleted(nextTask.id, 1)}
// 							className={`ml-2 px-2 py-1 rounded focus:outline-none border-x-1 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out`}
// 						>
// 							<CircleCheckBig
// 								size={30}
// 								className={`transform transition-all duration-200 ease-in-out ${
// 									completedTasks.includes(nextTask.id)
// 										? "text-green-500"
// 										: "text-gray-400"
// 								}`}
// 							/>
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default CurrentTasks;
