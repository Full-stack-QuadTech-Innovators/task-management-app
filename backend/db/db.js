const mongoose = require("mongoose");
require("dotenv").config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);
// if (!process.env.MONGODB_URI) {
// 	console.error("MONGODB_URI environment variable is not defined.");
// 	process.exit(1);
// }

(async () => {
	try {
		console.log(`process.env.MONGODB_URI :  
        ${process.env.MONGODB_URI}`);
		await mongoose.connect(process.env.MONGODB_URI, {});
		console.log("🟢 Database Connection Established Successfully 🟢");
	} catch (err) {
		console.log("Error connecting to MongoDB:");
		throw err;
	}
})();
