const jwt = require("jsonwebtoken");

const jwtHelpers = {
	generateAccessToken: function (user) {
		return jwt.sign(
			{
				id: user._id,
				name: user.username,
				email: user.email,
			},
			process.env.JWT_ACCESS_SECRET,
			{ expiresIn: "3m" } // Shorter expiration time for access token
		);
	},
	generateRefreshToken: function (user) {
		return jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_REFRESH_SECRET,
			{
				expiresIn: "7d", // Longer expiration for refresh token
			}
		);
	},
	verifyAccessToken: function (token) {
		return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
	},
	verifyRefreshToken: function (token) {
		return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
	},
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
			req.user = decoded;
			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res
					.status(401)
					.json({ message: "Token expired", expired: true });
			}
			return res.status(403).json({ message: "Invalid token." });
		}
	},
};

module.exports = jwtHelpers;
