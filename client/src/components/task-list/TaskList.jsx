import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3009",
});

const TaskList = ({ onTasksUpdate }) => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchTasks();
	}, []);

	useEffect(() => {
		if (tasks.length > 0) {
			onTasksUpdate(tasks[0], tasks[1]);
		} else {
			onTasksUpdate(null, null);
		}
	}, [tasks, onTasksUpdate]);

	const fetchTasks = async () => {
		setIsLoading(true);
		try {
			const response = await api.get("/api/tasks", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});
			setTasks(response.data);
			setError(null);
		} catch (err) {
			setError("Failed to fetch tasks");
			console.error("Error fetching tasks:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddTask = async (e) => {
		e.preventDefault();
		if (!newTask.trim()) return;

		try {
			const response = await api.post(
				"/api/tasks",
				{ content: newTask },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			setTasks([...tasks, response.data]);
			setNewTask("");
		} catch (err) {
			setError("Failed to add task");
			console.error("Error adding task:", err);
		}
	};

	const handleDeleteTask = async (taskId) => {
		try {
			await api.delete(`/api/tasks/${taskId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});
			setTasks(tasks.filter((task) => task._id !== taskId));
		} catch (err) {
			setError("Failed to delete task");
			console.error("Error deleting task:", err);
		}
	};

	if (isLoading) return <div>Loading tasks...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="col-start-1 col-end-2 row-start-2 row-end-5 flex items-center justify-center">
			<div className="flex flex-col w-5/6 h-5/6 bg-lightMode-background dark:bg-darkMode-containerBlack rounded-2xl overflow-hidden">
				<div className="flex-grow overflow-y-auto p-5 space-y-4">
					{tasks.map((task) => (
						<div
							key={task._id}
							className={`p-4 rounded-2xl text-center flex items-center justify-between ${
								task.pinned
									? "bg-lightMode-topTask dark:bg-darkMode-topTask text-black dark:text-white"
									: "bg-lightMode-normalTask dark:bg-darkMode-normalTask text-black dark:text-white"
							}`}
						>
							<span>{task.content}</span>
							<button
								onClick={() => handleDeleteTask(task._id)}
								className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
							>
								🗑️
							</button>
						</div>
					))}
				</div>
				<div className="p-5 bg-lightMode-background dark:bg-darkMode-containerBlack">
					<form onSubmit={handleAddTask} className="w-full">
						<input
							className="w-full p-4 bg-transparent border-b-2 border-black dark:border-white text-gray-900 dark:text-white placeholder-gray-500 text-center focus:outline-none"
							placeholder="Add a task"
							value={newTask}
							onChange={(e) => setNewTask(e.target.value)}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default TaskList;
