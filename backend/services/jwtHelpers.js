/**
 * TBD:
 * 	implement refresh token
 */
const jwt = require("jsonwebtoken");

const jwtHelpers = {
	generateAccessToken: function (user) {
		return jwt.sign(
			{
				id: user._id, // It's often useful to include the user's ID
				name: user.username,
				email: user.email,
			},
			process.env.JWT_ACCESS_SECRET,
			{ expiresIn: "1h" } // Consider adding an expiration
		);
	},

	generateRefreshToken: function (user) {
		return jwt.sign(
			{
				id: user._id,
				name: user.username,
				email: user.email,
			},
			process.env.JWT_REFRESH_SECRET,
			{
				expiresIn: "1d",
			}
		);
	},

	verifyAccessToken: function (token) {
		return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
	},

	verifyRefreshToken: function (token) {
		return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
	},

	// Auth middleware
	authMiddleware: function (req, res, next) {
		const authHeader = req.headers["authorization"];
		const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
		if (!token) {
			return res
				.status(401)
				.json({ message: "Access denied. No token provided." });
		}
		try {
			const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			req.user = decoded; // Attach the decoded user info to the request
			next();
		} catch (error) {
			return res.status(403).json({ message: "Invalid token." });
		}
	},
};

module.exports = jwtHelpers;
