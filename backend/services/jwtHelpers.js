const jwt = require("jsonwebtoken");

const jwtHelpers = {
	generateAccessToken: function (user) {
		return jwt.sign(
			{
				name: user.username,
				email: user.email,
			},
			process.env.JWT_ACCESS_SECRET
		);
	},

	generateRefreshToken: function (user) {
		return jwt.sign(
			{
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
};

module.exports = jwtHelpers;
