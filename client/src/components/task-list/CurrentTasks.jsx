import React from "react";

import { CircleCheckBig, Pin } from "lucide-react";
function CurrentTasks({ currentTask, nextTask }) {
	const setTaskAsCompleted = (taskId, userId) => {};
	return (
		<div className="col-start-2 col-end-5 row-start-2 row-end-4  rounded-2xl p-4">
			<h2 className="text-2xl font-semibold text-white mb-4">
				Current Task
			</h2>
			<div className="grid grid-cols-2 gap-4">
				<div className="bg-lightMode-topTask dark:bg-darkMode-topTask p-4 rounded-xl text-white">
					<h3 className="font-semibold text-black dark:text-white mb-2">
						Current Task
					</h3>
					<div className="flex justify-between items-center">
						<p className="text-black dark:text-white flex-grow">
							{currentTask
								? currentTask.content
								: "No current task"}
						</p>
						<button
							onClick={() => console.log("clicked")}
							className={`ml-2 px-2 py-1 rounded focus:outline-none border-x-1 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out`}
						>
							<CircleCheckBig
								size={30}
								className={`transform transition-all duration-200 ease-in-out`}
							/>
						</button>
					</div>
				</div>
				<div className="bg-lightMode-normalTask dark:bg-darkMode-normalTask p-4 rounded-xl text-white">
					<h3 className="font-semibold mb-2 text-black dark:text-white">
						Next Task
					</h3>
					<div className="flex justify-between items-center">
						<p className="text-black dark:text-white">
							{nextTask ? nextTask.content : "No next task"}
						</p>
						<button
							onClick={() => console.log("clicked")}
							className={`ml-2 px-2 py-1 rounded focus:outline-none border-x-1 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out`}
						>
							<CircleCheckBig
								size={30}
								className={`transform transition-all duration-200 ease-in-out`}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CurrentTasks;

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
