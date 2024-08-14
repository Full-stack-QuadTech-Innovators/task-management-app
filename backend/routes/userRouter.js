const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

// Route to get all users
router.get("/users", UserController.getUsers);

// Route to create a new user
router.post("/users", UserController.createUser);

// Route to update an existing user
router.put("/users/:id", UserController.updateUser);

// Route to delete a user
router.delete("/users/:id", UserController.deleteUser);

// Route to handle user login
router.post("/login", UserController.loginUser);

module.exports = router;
