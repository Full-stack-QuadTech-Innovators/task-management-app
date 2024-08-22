const mongoose = require("mongoose");
const User = require("./User");

const taskSchema = new mongoose.Schema(
	{
		content: { type: String, required: true, trim: true },
		date: { type: Date, default: Date.now },
		completed: { type: Boolean, default: false },
		pinned: { type: Boolean, default: false },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: User,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.model("Task", taskSchema);
console.log("Task model created");

module.exports = Task;
