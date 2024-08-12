const User = require("../models/User");
const { hashP } = require("../services/encrypt");

const UserController = {
	getUsers: async (req, res) => {
		try {
			const user = await User.find();
			res.status(200).json(user);
		} catch (err) {
			console.error("There is an error:", err);
			res.status(500).json({ err: "Internal error" });
		}
	},

	createUser: async (req, res) => {
		try {
			const { username, email, password } = req.body;
			const hashedPassword = await hashP(password);
			const user = new User({
				username,
				email,
				password: hashedPassword,
			});
			await user.save();
			res.status(201).json({
				message: "User created successfully",
				userId: user._id,
			});
		} catch (err) {
			if (err.code === 11000) {
				res.status(400).json({
					message: "Username or email already exists",
				});
			} else {
				res.status(400).json({ message: err.message });
			}
		}
	},

	updateUser: async (req, res) => {
		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
				}
			);
			res.status(200).json(updatedUser);
		} catch (err) {
			console.error("There is an error:", err);
			res.status(500).json({ err: err.message });
		}
	},

	deleteUser: async (req, res) => {
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(204).send();
		} catch (err) {
			console.error("There is an error:", err);
			res.status(500).json({ err: "Internal error" });
		}
	},
};

module.exports = UserController;
