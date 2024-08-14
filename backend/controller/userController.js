const User = require("../models/User");
const { hashP, compareP } = require("../services/encrypt");
const {
	generateAccessToken,
	generateRefreshToken,
} = require("../services/jwtHelpers");
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
	loginUser: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res
					.status(401)
					.json({ message: "Invalid email or password" });
			}
			const isMatch = await compareP(password, user.password);
			if (!isMatch) {
				return res
					.status(401)
					.json({ message: "Invalid Email Or Passowrd" });
			}
			//JWT
			let accessToken = generateAccessToken(user);
			let refreshToken = generateRefreshToken(user);
			await User.findByIdAndUpdate(
				user._id,
				{ refreshToken },
				{ new: true }
			);
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
			});

			res.status(200).json({
				auth: true,
				accessToken,
				message: "Login successful",
			});
		} catch (error) {
			console.error(error);
			throw error;
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
	getCurrentUser: async (req, res) => {
		try {
			const user = await User.findById(req.user.id).select("-password");
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			res.json(user);
		} catch (error) {
			console.error("Error in getCurrentUser:", error);
			res.status(500).json({ message: "Server error" });
		}
	},
};

module.exports = UserController;
