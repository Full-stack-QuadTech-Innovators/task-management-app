const User = require("../models/User");
const { hashP, compareP } = require("../services/encrypt");
const {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
	verifyAccessToken,
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
			console.log("accessToken: ", accessToken);
			let refreshToken = generateRefreshToken(user);
			console.log("refreshToken: ", refreshToken);
			await User.findByIdAndUpdate(
				user._id,
				{ refreshToken },
				{ new: true }
			);
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000 * 7,
				sameSite: "strict",
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
	getRefreshToken: async (req, res) => {
		console.log("Cookies received:", req.cookies);
		const refreshToken = req.cookies?.refreshToken;

		if (!refreshToken) {
			console.log("No refresh token found in cookies");
			return res.status(401).json({ message: "Refresh Token Required" });
		}

		try {
			const decoded = verifyRefreshToken(refreshToken);
			console.log("Decoded refresh token:", decoded);

			const user = await User.findById(decoded.id);
			console.log("User found:", user ? user._id : "No user found");

			if (!user || user.refreshToken !== refreshToken) {
				console.log("Invalid refresh token");
				return res
					.status(403)
					.json({ message: "Invalid refresh token" });
			}

			const newAccessToken = generateAccessToken(user);
			const newRefreshToken = generateRefreshToken(user);

			// Update user's refresh token in the database
			await User.findByIdAndUpdate(user._id, {
				refreshToken: newRefreshToken,
			});

			// Set the new refresh token as an HTTP-only cookie
			res.cookie("refreshToken", newRefreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production", // true in production
				sameSite: "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});

			console.log("Generated new access token and refresh token");
			res.json({ accessToken: newAccessToken });
		} catch (error) {
			console.error("Error during refresh token verification:", error);
			return res.status(403).json({ message: "Invalid refresh token" });
		}
	},
};

module.exports = UserController;
