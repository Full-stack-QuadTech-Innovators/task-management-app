const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = {
	saltRounds: +process.env.SALT_ROUNDS,

	hashP: async function (str) {
		try {
			let hash = await bcrypt.hash(str, module.exports.saltRounds);
			console.log(`Password hashed successfully.`); // Removed sensitive data from logs
			return hash;
		} catch (err) {
			console.error(`Error hashing password: ${err.message}`);
			throw err;
		}
	},

	compareP: async function (plainPassword, hashedPassword) {
		try {
			const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
			if (isMatch) {
				console.log("Passwords match.");
			} else {
				console.log("Passwords don't match.");
			}
			return isMatch; // Return the result of the comparison
		} catch (error) {
			console.error(`Error comparing passwords: ${error.message}`);
			throw error;
		}
	},

	getResetToken: function () {
		const token = crypto.randomBytes(20).toString("hex");
		return crypto.createHash("sha256").update(token).digest("hex");
	},
};
