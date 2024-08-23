import React from "react";

function TaskStatus() {
	return (
		<div className="col-start-1 col-end-2 row-start-5 row-end-7 bg-lightMode-background dark:bg-darkMode-containerBlack rounded-2xl p-4 overflow-y-auto">
			{["25/07/2024", "24/07/2024", "23/07/2024", "22/07/2024", ,].map(
				(date, index) => (
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
				)
			)}
		</div>
	);
}

export default TaskStatus;
