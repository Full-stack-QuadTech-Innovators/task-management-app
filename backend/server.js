// Import necessary modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");
const socketIo = require("socket.io");

const http = require("http");
// Initialize the Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		methods: ["GET", "POST"],
		credentials: true,
	},
});
console.log("Loaded taskRouter:", taskRouter);

require("./db/db");

// Socket.IO connection handling
io.on("connection", (socket) => {
	console.log("New client connected");

	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});

// CORS configuration
const corsOptions = {
	origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow your frontend URL
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(cors(corsOptions));

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging HTTP requests

// Define a simple route
app.get("/", (req, res) => {
	res.send("Welcome to the Express server!");
});

// Use userRouter for /api/users routes
console.log("Setting up /api/users route");
app.use("/api/users", userRouter);
console.log("Setting up /api/tasks route");
app.use("/api/tasks", taskRouter);

// Serve static files from a 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Handle 404 errors (Not Found)
app.use((req, res, next) => {
	res.status(404).send("Sorry, the page you are looking for does not exist.");
});

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		message: err.message || "Something went wrong!",
		error: process.env.NODE_ENV === "production" ? {} : err,
	});
});

// Define the port the server will listen on
const PORT = process.env.PORT || 3009;

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
