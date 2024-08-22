import React from "react";

function CurrentTasks({ currentTask, nextTask }) {
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
					<p className="text-black dark:text-white">
						{currentTask ? currentTask.content : "No current task"}
					</p>
				</div>
				<div className="bg-lightMode-normalTask dark:bg-darkMode-normalTask p-4 rounded-xl text-white">
					<h3 className="font-semibold mb-2 text-black dark:text-white">
						Next Task
					</h3>
					<p className="text-black dark:text-white">
						{nextTask ? nextTask.content : "No next task"}
					</p>
				</div>
			</div>
		</div>
	);
}

export default CurrentTasks;
