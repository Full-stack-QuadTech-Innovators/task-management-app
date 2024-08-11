// Import necessary modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();
require("./db/db");

// Initialize the Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging HTTP requests
require("./db/db");
// Define a simple route
app.get("/", (req, res) => {
	res.send("Welcome to the Express server!");
});

// Example API route
// app.get('/api/data', (req, res) => {
//   res.json({ message: 'This is some data from the API' });
// });

// Serve static files from a 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Handle 404 errors (Not Found)
app.use((req, res, next) => {
	res.status(404).send("Sorry, the page you are looking for does not exist.");
});

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

// Define the port the server will listen on
const PORT = process.env.PORT || 3009;

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
