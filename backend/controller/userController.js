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
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({ err: "All fields are required" });
		}

		try {
			// Check if user already exists
			const existingUser = await User.findOne({
				$or: [{ username }, { email }],
			});
			if (existingUser) {
				return res
					.status(400)
					.json({
						err: "User with this username or email already exists",
					});
			}

			let hashedPassword = await hashP(password);

			const newUser = new User({
				username,
				email,
				password: hashedPassword,
			});

			await newUser.save();

			res.status(201).json(newUser);
		} catch (err) {
			console.error("There is an error:", err);
			res.status(500).json({ err: err.message });
		}
	},

	// updatePassword: async (req, res) => {
	// 	try {
	// 		let passwd = await hashP(req.body.password);

	// 		const updatedUser = await User.findByIdAndUpdate(
	// 			req.params.id,
	// 			{ password: passwd },
	// 			{
	// 				new: true,
	// 			}
	// 		);
	// 		res.status(200).json(updatedUser);
	// 	} catch (err) {
	// 		console.error("There is an error:", err);
	// 		res.status(500).json({ err: err.message });
	// 	}
	// },

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
