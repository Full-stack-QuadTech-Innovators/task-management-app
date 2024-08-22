const express = require("express");
const { authMiddleware } = require("../services/jwtHelpers");
const taskController = require("../controller/taskController");
const router = express.Router();

// This will respond to GET /api/tasks
console.log("Setting up GET / route in taskRouter");
router.get("/", taskController.displayTasks);

router.post("/", authMiddleware, taskController.addTask);
// router.put("/:id", taskController.updateTask);
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
