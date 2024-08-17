const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

console.log("MONGODB_URI from .env:", process.env.MONGODB_URI);

const mongoose = require("mongoose");

console.log("MONGODB_URI:", process.env.MONGODB_URI);

(async () => {
	try {
		console.log(`process.env.MONGODB_URI: ${process.env.MONGODB_URI}`);
		await mongoose.connect(process.env.MONGODB_URI, {});
		console.log("🟢 Database Connection Established Successfully 🟢");
	} catch (err) {
		console.log("Error connecting to MongoDB:");
		console.error(err);
	}
})();
