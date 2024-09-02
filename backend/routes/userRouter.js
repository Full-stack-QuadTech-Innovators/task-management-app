const express = require("express");
const UserController = require("../controller/userController");
const { authMiddleware } = require("../services/jwtHelpers");
const router = express.Router();

// console.log("UserController methods:", Object.keys(UserController));

// Public routes
router.post("/login", UserController.loginUser);
router.post("/", UserController.createUser); // Signup route

// Protected routes
console.log("Setting up GET /");
router.get("/", authMiddleware, UserController.getUsers);
console.log("Setting up PUT /:id");
router.put("/:id", authMiddleware, UserController.updateUser);
console.log("Setting up DELETE /:id");
router.delete("/:id", authMiddleware, UserController.deleteUser);
console.log("Setting up GET /me");
router.get("/me", authMiddleware, UserController.getCurrentUser);

module.exports = router;
