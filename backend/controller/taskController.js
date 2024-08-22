const Tasks = require("../models/Tasks"); // Make sure this matches your model name

const taskController = {
	displayTasks: async (req, res) => {
		console.log("displayTasks function called");

		try {
			const tasks = await Tasks.find();
			console.log("Tasks fetched:", tasks);

			res.json(tasks);
		} catch (error) {
			console.error("Error fetching tasks:", error);
			res.status(500).json({ message: "Error fetching tasks" });
		}
	},
	addTask: async (req, res) => {
		console.log("starting to add new task");
		console.log("Request body:", req.body);
		console.log("User from request:", req.user);

		try {
			const { content } = req.body;

			if (!content) {
				return res
					.status(400)
					.json({ message: "Task content is required" });
			}

			if (!req.user || !req.user.id) {
				return res
					.status(401)
					.json({ message: "User not authenticated" });
			}

			const newTask = new Tasks({
				content: content,
				user: req.user.id,
			});

			const savedTask = await newTask.save();
			console.log("Task saved:", savedTask);
			res.status(201).json(savedTask);
		} catch (error) {
			console.error("Error adding task:", error);
			if (error.name === "ValidationError") {
				return res.status(400).json({
					message: "Validation error",
					errors: Object.values(error.errors).map(
						(err) => err.message
					),
				});
			}
			res.status(500).json({
				message: "Error adding task",
				error: error.toString(),
			});
		}
	},
	deleteTask: async (req, res) => {
		try {
			const taskId = req.params.id;
			const userId = req.user.id;
			console.log("taskId: ", taskId);
			console.log("userId: ", userId);

			const task = Tasks.findOne({ _id: taskId, user: userId });
			if (!task) {
				return res.status(404).json({
					message:
						"Task not found or you're not authorized to delete this task",
				});
			}
			await Tasks.findByIdAndDelete(taskId);
			res.json({ message: "Task deleted successfully" });
		} catch (error) {
			console.error("Error deleting task:", error);
			res.status(500).json({
				message: "Error deleting task",
				error: error.toString(),
			});
		}
	},
};

module.exports = taskController;
