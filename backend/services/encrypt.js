const bcrypt = require("bcrypt");
const crypto = require("crypto");

module.exports = {
	saltRounds: +process.env.SALT_ROUNDS,

	hashP: async function (str) {
		try {
			let hash = await bcrypt.hash(str, module.exports.saltRounds);
			console.log(`hashed password ${str}: ${hash}`);
			return hash;
		} catch (err) {
			console.log(err.message);
			return err.message;
		}
	},

	compareP: async function (plainPassword, hashedPassword) {
		try {
			const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
			isMatch
				? console.log("Passwords match.")
				: console.log("Passwords don't match.");
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	getResetToken: function () {
		const token = crypto.randomBytes(20).toString("hex");
		return crypto.createHash("sha256").update(token).digest("hex");
	},
};
