// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Trash2, Edit2, Pin } from "lucide-react";
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

// const api = axios.create({
// 	baseURL: "http://localhost:3009",
// });

// const TaskList = ({ onTasksUpdate }) => {
// 	const [newTask, setNewTask] = useState("");
// 	const [error, setError] = useState(null);
// 	const [editingTask, setEditingTask] = useState(null);

// 	const handleAddTask = async (e) => {
// 		e.preventDefault();
// 		if (!newTask.trim()) return;
// 		try {
// 			const response = await api.post(
// 				"/api/tasks",
// 				{ content: newTask },
// 				{
// 					headers: {
// 						Authorization: `Bearer ${localStorage.getItem(
// 							"accessToken"
// 						)}`,
// 					},
// 				}
// 			);
// 			setTasks([response.data, ...tasks]);
// 			setNewTask("");
// 		} catch (err) {
// 			setError("Failed to add task");
// 			console.error("Error adding task:", err);
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

// 	const handleEditTask = async (taskId, newContent) => {
// 		try {
// 			const response = await api.put(
// 				`/api/tasks/${taskId}`,
// 				{ content: newContent },
// 				{
// 					headers: {
// 						Authorization: `Bearer ${localStorage.getItem(
// 							"accessToken"
// 						)}`,
// 					},
// 				}
// 			);
// 			onTasksUpdate(
// 				tasks.map((task) =>
// 					task._id === taskId ? response.data : task
// 				)
// 			);
// 			setEditingTask(null);
// 		} catch (err) {
// 			setError("Failed to edit task");
// 			console.error("Error editing task:", err);
// 		}
// 	};

// 	const handleTogglePin = async (taskId) => {
// 		try {
// 			const response = await api.patch(
// 				`/api/tasks/${taskId}/pinned`,
// 				{},
// 				{
// 					headers: {
// 						Authorization: `Bearer ${localStorage.getItem(
// 							"accessToken"
// 						)}`,
// 					},
// 				}
// 			);
// 			onTasksUpdate(response.data);
// 		} catch (err) {
// 			setError("Failed to toggle pin status");
// 			console.error("Error toggling pin status:", err);
// 		}
// 	};

// 	if (isLoading) return <div>Loading tasks...</div>;
// 	if (error) return <div>Error: {error}</div>;

// 	return (
// 		<div className="col-start-1 col-end-2 row-start-2 row-end-7 flex items-center justify-center">
// 			<div className="flex flex-col w-full h-full bg-lightMode-background dark:bg-darkMode-containerBlack rounded-2xl overflow-hidden">
// 				<div className="flex-grow overflow-y-auto p-5 space-y-4">
// 					{tasks.map((task) => (
// 						<div
// 							key={task._id}
// 							className={`p-4 rounded-2xl text-center flex items-center justify-between ${
// 								task.pinned
// 									? "bg-lightMode-topTask dark:bg-darkMode-topTask text-black dark:text-white"
// 									: "bg-lightMode-normalTask dark:bg-darkMode-normalTask text-black dark:text-white"
// 							}`}
// 						>
// 							{editingTask === task._id ? (
// 								<input
// 									type="text"
// 									value={task.content}
// 									onChange={(e) => {
// 										const updatedTasks = tasks.map((t) =>
// 											t._id === task._id
// 												? {
// 														...t,
// 														content: e.target.value,
// 												  }
// 												: t
// 										);
// 										setTasks(updatedTasks);
// 									}}
// 									onBlur={() =>
// 										handleEditTask(task._id, task.content)
// 									}
// 									onKeyPress={(e) => {
// 										if (e.key === "Enter") {
// 											handleEditTask(
// 												task._id,
// 												task.content
// 											);
// 										}
// 									}}
// 									className="bg-transparent w-full text-center focus:outline-none"
// 									autoFocus
// 								/>
// 							) : (
// 								<span>{task.content}</span>
// 							)}
// 							<div className="flex items-center">
// 								<button
// 									onClick={() => setEditingTask(task._id)}
// 									className="ml-2 px-2 py-1 text-blue-500 rounded hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out"
// 								>
// 									<Edit2
// 										size={20}
// 										className="transform hover:scale-110 transition-transform duration-200 ease-in-out"
// 									/>
// 								</button>

// 								{/* <button
// 									onClick={() => handleDeleteTask(task._id)}
// 									className="ml-2 px-2 py-1 text-red-500 rounded hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out"
// 								>
// 									<Trash2
// 										size={20}
// 										className="transform hover:scale-110 transition-transform duration-200 ease-in-out"
// 									/>
// 								</button> */}
// 								<AlertDialog>
// 									<AlertDialogTrigger asChild>
// 										<button className="ml-2 px-2 py-1 text-red-500 rounded hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out">
// 											<Trash2
// 												size={20}
// 												className="transform hover:scale-110 transition-transform duration-200 ease-in-out"
// 											/>
// 										</button>
// 									</AlertDialogTrigger>
// 									<AlertDialogContent>
// 										<AlertDialogHeader>
// 											<AlertDialogTitle>
// 												Are you sure you want to delete
// 												this task?
// 											</AlertDialogTitle>
// 											<AlertDialogDescription>
// 												This action cannot be undone.
// 												This will permanently delete the
// 												task from your list.
// 											</AlertDialogDescription>
// 										</AlertDialogHeader>
// 										<AlertDialogFooter>
// 											<AlertDialogCancel>
// 												Cancel
// 											</AlertDialogCancel>
// 											<AlertDialogAction
// 												onClick={() =>
// 													handleDeleteTask(task._id)
// 												}
// 											>
// 												Delete
// 											</AlertDialogAction>
// 										</AlertDialogFooter>
// 									</AlertDialogContent>
// 								</AlertDialog>
// 								<button
// 									onClick={() => handleTogglePin(task._id)}
// 									className={`ml-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out ${
// 										task.pinned
// 											? "text-yellow-500 hover:text-yellow-600"
// 											: "text-gray-400 hover:text-gray-500"
// 									}`}
// 								>
// 									<Pin
// 										size={20}
// 										className={`transform transition-all duration-200 ease-in-out ${
// 											task.pinned
// 												? "rotate-45 scale-110"
// 												: "hover:scale-110"
// 										}`}
// 									/>
// 								</button>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 				<div className="p-5 bg-lightMode-background dark:bg-darkMode-containerBlack">
// 					<form onSubmit={handleAddTask} className="w-full">
// 						<input
// 							className="w-full p-4 bg-transparent border-b-2 border-black dark:border-white text-gray-900 dark:text-white placeholder-gray-500 text-center focus:outline-none"
// 							placeholder="Add a task"
// 							value={newTask}
// 							onChange={(e) => setNewTask(e.target.value)}
// 						/>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default TaskList;

import React, { useState } from "react";
import axios from "axios";
import { Trash2, Edit2, Pin } from "lucide-react";
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

const api = axios.create({
	baseURL: "http://localhost:3009",
});

const TaskList = ({ onTasksUpdate, tasks }) => {
	const [newTask, setNewTask] = useState("");
	const [error, setError] = useState(null);
	const [editingTask, setEditingTask] = useState(null);

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
			onTasksUpdate([response.data, ...tasks]);
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
			onTasksUpdate(tasks.filter((task) => task._id !== taskId));
		} catch (err) {
			setError("Failed to delete task");
			console.error("Error deleting task:", err);
		}
	};

	const handleEditTask = async (taskId, newContent) => {
		try {
			const response = await api.put(
				`/api/tasks/${taskId}`,
				{ content: newContent },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			onTasksUpdate(
				tasks.map((task) =>
					task._id === taskId ? response.data : task
				)
			);
			setEditingTask(null);
		} catch (err) {
			setError("Failed to edit task");
			console.error("Error editing task:", err);
		}
	};

	const handleTogglePin = async (taskId) => {
		try {
			const response = await api.patch(
				`/api/tasks/${taskId}/pinned`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
				}
			);
			onTasksUpdate(response.data);
		} catch (err) {
			setError("Failed to toggle pin status");
			console.error("Error toggling pin status:", err);
		}
	};

	return (
		<div className="col-start-1 col-end-2 row-start-2 row-end-7 flex items-center justify-center">
			<div className="flex flex-col w-full h-full bg-lightMode-background dark:bg-darkMode-containerBlack rounded-2xl overflow-hidden">
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
							{editingTask === task._id ? (
								<input
									type="text"
									value={task.content}
									onChange={(e) => {
										const updatedTasks = tasks.map((t) =>
											t._id === task._id
												? {
														...t,
														content: e.target.value,
												  }
												: t
										);
										onTasksUpdate(updatedTasks);
									}}
									onBlur={() =>
										handleEditTask(task._id, task.content)
									}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											handleEditTask(
												task._id,
												task.content
											);
										}
									}}
									className="bg-transparent w-full text-center focus:outline-none"
									autoFocus
								/>
							) : (
								<span>{task.content}</span>
							)}
							<div className="flex items-center">
								<button
									onClick={() => setEditingTask(task._id)}
									className="ml-2 px-2 py-1 text-blue-500 rounded hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out"
								>
									<Edit2
										size={20}
										className="transform hover:scale-110 transition-transform duration-200 ease-in-out"
									/>
								</button>
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<button className="ml-2 px-2 py-1 text-red-500 rounded hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out">
											<Trash2
												size={20}
												className="transform hover:scale-110 transition-transform duration-200 ease-in-out"
											/>
										</button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you sure you want to delete
												this task?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone.
												This will permanently delete the
												task from your list.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction
												onClick={() =>
													handleDeleteTask(task._id)
												}
											>
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
								<button
									onClick={() => handleTogglePin(task._id)}
									className={`ml-2 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out ${
										task.pinned
											? "text-yellow-500 hover:text-yellow-600"
											: "text-gray-400 hover:text-gray-500"
									}`}
								>
									<Pin
										size={20}
										className={`transform transition-all duration-200 ease-in-out ${
											task.pinned
												? "rotate-45 scale-110"
												: "hover:scale-110"
										}`}
									/>
								</button>
							</div>
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
